const { neon } = require('@neondatabase/serverless');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not defined in .env.local');
    process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
    console.log('Starting migration to add missing columns to admins table...');
    try {
        // Add avatar_url if it doesn't exist
        await sql`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='admins' AND column_name='avatar_url') THEN
          ALTER TABLE admins ADD COLUMN avatar_url TEXT;
        END IF;
      END
      $$;
    `;
        console.log('✓ avatar_url column checked/added');

        // Add role if it doesn't exist
        await sql`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='admins' AND column_name='role') THEN
          ALTER TABLE admins ADD COLUMN role TEXT DEFAULT 'admin';
        END IF;
      END
      $$;
    `;
        console.log('✓ role column checked/added');

        console.log('Migration completed successfully!');
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrate();
