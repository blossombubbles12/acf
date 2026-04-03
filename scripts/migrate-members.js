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
        console.log("Updating members table...");
        await sql`
            ALTER TABLE members 
            ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active',
            ADD COLUMN IF NOT EXISTS industry TEXT,
            ADD COLUMN IF NOT EXISTS cohort TEXT,
            ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT true,
            ADD COLUMN IF NOT EXISTS biography TEXT;
        `;
        console.log("Members table updated successfully.");
        process.exit(0);
    } catch (err) {
        console.error("Error updating table:", err);
        process.exit(1);
    }
}

migrate();
