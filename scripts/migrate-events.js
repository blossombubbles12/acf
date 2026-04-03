const fs = require('fs');
const path = require('path');
const { neon } = require('@neondatabase/serverless');

const envPath = path.join(__dirname, '../.env.local');
const env = fs.readFileSync(envPath, 'utf8');
const dbUrlMatch = env.match(/DATABASE_URL=['"]?(.+?)['"]?\s*$/m);
const dbUrl = dbUrlMatch ? dbUrlMatch[1] : null;

if (!dbUrl) {
    console.error("DATABASE_URL not found in .env.local");
    process.exit(1);
}

const sql = neon(dbUrl);

async function migrate() {
    try {
        console.log("Updating events table schema...");

        await sql`
            ALTER TABLE events 
            ADD COLUMN IF NOT EXISTS time TEXT,
            ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published',
            ADD COLUMN IF NOT EXISTS author_id INTEGER REFERENCES admins(id)
        `;

        console.log("Events table updated successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Migration error:", err);
        process.exit(1);
    }
}

migrate();
