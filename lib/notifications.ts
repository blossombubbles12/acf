import { sql } from "./db";

export async function createNotification(type: 'news' | 'member' | 'event' | 'media' | 'system', message: string, link?: string) {
    try {
        await sql`
      INSERT INTO notifications (type, message, link)
      VALUES (${type}, ${message}, ${link || null})
    `;
        return true;
    } catch (error) {
        console.error("Notification logging failed:", error);
        return false;
    }
}
