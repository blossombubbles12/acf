import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const folder = searchParams.get('folder');
        const type = searchParams.get('type') || 'image';
        
        const expression = folder 
            ? `folder:acf/${folder}/* AND resource_type:${type}`
            : `folder:acf/* AND resource_type:${type}`;

        // Search for specific images
        const result = await cloudinary.search
            .expression(expression)
            .sort_by('created_at', 'desc')
            .max_results(500)
            .execute();

        // Shuffle and pick 10 random images for the carousel
        const shuffled = result.resources
            .map((value: any) => ({ value, sort: Math.random() }))
            .sort((a: any, b: any) => a.sort - b.sort)
            .map(({ value }: any) => value)
            .slice(0, 10);

        return NextResponse.json(shuffled);
    } catch (error) {
        console.error('Featured media error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
