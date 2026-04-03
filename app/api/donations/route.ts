import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            donor_name,
            donor_email,
            amount,
            currency,
            payment_reference,
            campaign
        } = body;

        // In a real application, we would verify the payment reference with a gateway (Paystack/Flutterwave)
        // For now, we record the intent or the successful response from the client

        const donation = await sql`
            INSERT INTO donations (
                donor_name,
                donor_email,
                amount,
                currency,
                payment_reference,
                status,
                campaign
            )
            VALUES (
                ${donor_name || 'Anonymous'},
                ${donor_email || null},
                ${amount},
                ${currency || 'NGN'},
                ${payment_reference},
                'successful', -- Assuming client verified it
                ${campaign || 'General Fund'}
            )
            RETURNING *
        `;

        // Log notification for admin
        await sql`
            INSERT INTO notifications (type, message, link)
            VALUES ('donation', ${`New donation of ${currency || 'NGN'} ${amount} from ${donor_name || 'Anonymous'}`}, '/admin/donations')
        `;

        return NextResponse.json(donation[0]);
    } catch (error) {
        console.error('Donation logging error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
