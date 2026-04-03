const fs = require('fs');
const path = require('path');
const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');

const envPath = path.join(__dirname, '../.env.local');
const env = fs.readFileSync(envPath, 'utf8');
const dbUrlMatch = env.match(/DATABASE_URL=['"]?(.+?)['"]?\s*$/m);
const dbUrl = dbUrlMatch ? dbUrlMatch[1] : null;

if (!dbUrl) {
    console.error("DATABASE_URL not found in .env.local");
    process.exit(1);
}

const sql = neon(dbUrl);

async function initAdmin() {
    try {
        console.log("Checking for existing admins...");
        const existing = await sql`SELECT count(*) FROM admins`;
        if (parseInt(existing[0].count) > 0) {
            console.log("Admin already exists. Skipping creation.");
        } else {
            const hashedPassword = await bcrypt.hash("admin123", 10);
            await sql`
                INSERT INTO admins (name, email, password) 
                VALUES ('Super Admin', 'admin@actorscharity.org', ${hashedPassword})
            `;
            console.log("Super Admin created: admin@actorscharity.org / admin123");
        }
        process.exit(0);
    } catch (err) {
        console.error("Error creating admin:", err);
        process.exit(1);
    }
}

initAdmin();
