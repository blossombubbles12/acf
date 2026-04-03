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

const schema = fs.readFileSync(path.join(__dirname, '../lib/db/schema.sql'), 'utf8');
const sql = neon(dbUrl);

async function init() {
    try {
        console.log("Applying schema...");
        const commands = schema
            .split(';')
            .map(cmd => cmd.trim())
            .filter(cmd => cmd.length > 0);

        for (const cmd of commands) {
            await sql.query(cmd);
        }
        console.log("Schema applied successfully.");
    } catch (err) {
        console.error("Error applying schema:", err);
        process.exit(1);
    }
}

init();
