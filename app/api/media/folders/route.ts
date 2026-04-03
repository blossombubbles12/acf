import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const rootFolder = searchParams.get('root') || 'acf';
        const excludeSystem = searchParams.get('exclude_system') === 'true';

        // 1. Get folders gracefully
        let folderResult;
        try {
            folderResult = await cloudinary.api.sub_folders(rootFolder);
        } catch (err: any) {
            // If the folder doesn't exist yet, try creating it and return empty folders array
            if (err?.error?.http_code === 404 || err?.message?.includes("Can't find folder")) {
                try {
                    await cloudinary.api.create_folder(rootFolder);
                } catch(e) {}
                return NextResponse.json([]);
            }
            throw err;
        }
        
        let filteredFolders = folderResult.folders || [];

        // Apply system exclusions for public gallery
        if (excludeSystem) {
            const systemFolders = ['admins', 'events', 'profiles', 'slider', 'home', 'about'];
            filteredFolders = filteredFolders.filter((f: any) => 
                !systemFolders.includes(f.name.toLowerCase())
            );
        }

        // 2. For each folder, get the first image as cover and total count
        const foldersWithDetails = await Promise.all(
            filteredFolders.map(async (folder: any) => {
                try {
                    // Use Search API with quoted path to handle spaces in folder names
                    const searchData = await cloudinary.search
                        .expression(`folder:"${folder.path}"`)
                        .max_results(50)
                        .execute();

                    const images = searchData.resources.filter((r: any) => r.resource_type === 'image');
                    const randomCover = images.length > 0
                        ? images[Math.floor(Math.random() * images.length)].secure_url
                        : null;

                    return {
                        name: folder.name,
                        path: folder.path,
                        count: searchData.total_count,
                        cover: randomCover,
                    };
                } catch (err) {
                    console.error(`Error fetching details for folder ${folder.name}:`, err);
                    return {
                        name: folder.name,
                        path: folder.path,
                        count: 0,
                        cover: null,
                    };
                }
            })
        );

        return NextResponse.json(foldersWithDetails);
    } catch (error) {
        console.error('Fetch folders error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { name, root } = await request.json();
        if (!name) return NextResponse.json({ error: 'Folder name is required' }, { status: 400 });

        const basePath = root || 'acf';
        const path = `${basePath}/${name}`;
        const result = await cloudinary.api.create_folder(path);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Create folder error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
