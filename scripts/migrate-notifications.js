const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env.local');
const env = fs.readFileSync(envPath, 'utf8');
const dbUrlMatch = env.match(/DATABASE_URL=['"]?(.+?)['"]?\s*$/m);

if (!dbUrlMatch) {
    throw new Error('DATABASE_URL not found in .env.local');
}

const dbUrl = dbUrlMatch[1];
const sql = neon(dbUrl);

async function migrate() {
    console.log('Migrating notifications table...');
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS notifications (
                id SERIAL PRIMARY KEY,
                type TEXT NOT NULL,
                message TEXT NOT NULL,
                link TEXT,
                is_read BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;
        console.log('Notifications table created successfully!');
    } catch (error) {
        console.error('Migration failed:', error);
    }
}

migrate();
