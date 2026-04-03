const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env.local');
const env = fs.readFileSync(envPath, 'utf8');
const dbUrl = env.match(/DATABASE_URL=['"]?(.+?)['"]?\s*$/m)[1];

const sql = neon(dbUrl);

async function migrate() {
    console.log('Migrating posts table...');
    try {
        // Add specific columns if they don't exist
        await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published'`;
        await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS media JSONB`;

        // Make title nullable since we are moving to a feed style
        await sql`ALTER TABLE posts ALTER COLUMN title DROP NOT NULL`;

        console.log('Migration complete!');
    } catch (error) {
        console.error('Migration failed:', error);
    }
}

migrate();
