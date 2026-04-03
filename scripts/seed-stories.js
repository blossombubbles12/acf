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

async function seedPosts() {
    try {
        console.log("Seeding sample ACF impact stories...");

        const admin = await sql`SELECT id FROM admins LIMIT 1`;
        if (admin.length === 0) {
            console.error("No admin found. Please create an admin first.");
            process.exit(1);
        }
        const adminId = admin[0].id;

        const stories = [
            {
                title: "Nollywood's Impact: Transforming Lives Through Storytelling",
                content: "At the Actors Charity Foundation (ACF), we believe the roles played on-screen can spark real-world change. This month, we reflect on our journey and the impact our industry partners are making in local communities.",
                category: "news",
                image_url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2000"
            },
            {
                title: "Sustainable Change: Our Health Initiative Progress",
                content: "The ACF health committee continues to empower vulnerable populations. Read about the recent medical outreach sponsored by our industry ambassadors.",
                category: "announcement",
                image_url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2000"
            },
            {
                title: "Building Futures: The ACF Creative Arts Center",
                content: "We are proud to announce the commencement of the ACF Creative Arts Center. This legacy project aims to provide youth in underserved areas with world-class standard facilities for artistic expression.",
                category: "news",
                image_url: "https://images.unsplash.com/photo-1541829070764-84a7d30dee3f?q=80&w=2000"
            }
        ];

        for (const story of stories) {
            await sql`
                INSERT INTO posts (title, content, category, image_url, author_id)
                VALUES (${story.title}, ${story.content}, ${story.category}, ${story.image_url}, ${adminId})
            `;
        }

        console.log("ACF Impact stories seeded successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Error seeding stories:", err);
        process.exit(1);
    }
}

seedPosts();
