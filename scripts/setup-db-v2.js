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

const schemaContent = fs.readFileSync(path.join(__dirname, '../lib/db/schema.sql'), 'utf8');
const sql = neon(dbUrl);

async function init() {
    try {
        console.log("Cleaning and executing schema...");
        
        // Remove comments and multi-line formatting to avoid split issues
        const cleanSchema = schemaContent
            .replace(/--.*$/gm, '') // Remove single line comments
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
            .trim();

        const commands = cleanSchema
            .split(';')
            .map(cmd => cmd.trim())
            .filter(cmd => cmd.length > 0);

        for (const cmd of commands) {
            console.log(`Executing: ${cmd.substring(0, 50)}...`);
            await sql(cmd);
        }
        console.log("Schema applied successfully.");
    } catch (err) {
        console.error("Error applying schema:", err);
        process.exit(1);
    }
}

init();
