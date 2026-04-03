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

async function seed() {
    try {
        console.log("Seeding sample foundation members...");

        const members = [
            {
                full_name: "Richard Mofe-Damijo (RMD)",
                email: "rmd@foundation.org",
                phone: "+234 800 111 2222",
                occupation: "Actor & Philanthropist",
                industry: "Nollywood",
                location: "Lagos, Nigeria",
                cohort: "Trustee",
                biography: "A veteran in the Nigerian film industry. Dedicated to mentorship and youth empowerment through ACF.",
                status: "active",
                is_visible: true
            },
            {
                full_name: "Genevieve Nnaji",
                email: "genevieve.n@foundation.org",
                phone: "+234 800 333 4444",
                occupation: "Director & Producer",
                industry: "Entertainment",
                location: "Lagos, Nigeria",
                cohort: "Ambassador",
                biography: "Award-winning filmmaker supporting humanitarian advocacy through storytelling.",
                status: "active",
                is_visible: true
            }
        ];

        for (const person of members) {
            await sql`
                INSERT INTO members (full_name, email, phone, occupation, industry, location, cohort, biography, status, is_visible)
                VALUES (
                    ${person.full_name}, ${person.email}, ${person.phone}, 
                    ${person.occupation}, ${person.industry}, ${person.location}, 
                    ${person.cohort}, ${person.biography}, ${person.status}, ${person.is_visible}
                )
                ON CONFLICT (email) DO NOTHING
            `;
        }

        console.log("Seeding sample events...");

        const events = [
            {
                title: "ACF Humanitarian Gala 2026",
                description: "Harnessing the creativity of Nollywood for social good. A night of fundraising, advocacy, and celebrating sustainable social change.",
                date: "2026-12-15",
                time: "07:00 PM",
                location: "Eko Hotels, Lagos",
                status: "published",
                image_url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000"
            },
            {
                title: "Nollywood For Education Outreach",
                description: "Join leading actors and filmmakers as we visit marginalized communities to support education and empowerment.",
                date: "2026-03-20",
                time: "10:00 AM",
                location: "Makoko Community Hub, Lagos",
                status: "published",
                image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000"
            },
            {
                title: "ACF Industry Hub Launch",
                description: "Official launch of our community directory for networking and industry advocacy.",
                date: "2024-05-15",
                time: "05:00 PM",
                location: "Online / Virtual",
                status: "published",
                image_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2000"
            }
        ];

        for (const evt of events) {
            await sql`
                INSERT INTO events (title, description, date, time, location, status, image_url)
                VALUES (${evt.title}, ${evt.description}, ${evt.date}, ${evt.time}, ${evt.location}, ${evt.status}, ${evt.image_url})
            `;
        }

        console.log("Seeding completed successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Error seeding data:", err);
        process.exit(1);
    }
}

seed();
