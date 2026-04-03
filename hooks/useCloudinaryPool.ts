"use client";

import { useState, useEffect } from "react";
import { transformCloudinary } from "@/lib/cloudinary-client";

/**
 * A hook that maintains a pool of random images from Cloudinary.
 * Designed to minimize API calls by caching the result in session storage.
 * Falls back to real Cloudinary-hosted images in case the API is unavailable.
 */

const CACHE_KEY_PREFIX = "acf_media_pool_v2_";
const CLOUD = "dtw0ajpwa";
const cld = (id: string) => `https://res.cloudinary.com/${CLOUD}/image/upload/${id}`;
const FALLBACK_POOL = [
    "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=2000", // Community outreach
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000", // Human rights
    "https://images.unsplash.com/photo-1533750349088-cd8c2a7bb643?q=80&w=2000", // Theatre/Impact
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000", // Sustainability
];

export function useCloudinaryPool(folder: string = "", count: number = 10, type: string = "image") {
    const [images, setImages] = useState<string[]>(FALLBACK_POOL);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPool = async () => {
            const cacheKey = `${CACHE_KEY_PREFIX}${folder || 'root'}_${type}`;
            // Check session storage first to save API tokens
            try {
                const cached = sessionStorage.getItem(cacheKey);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        setImages(parsed);
                        setLoading(false);
                        return;
                    }
                }
            } catch (e) {
                // sessionStorage not available (SSR edge case)
            }

            try {
                let endpoint = folder ? `/api/media/featured?folder=${folder}` : `/api/media/featured`;
                if (type !== 'image') endpoint += (folder ? `&` : `?`) + `type=${type}`;
                const res = await fetch(endpoint);
                if (!res.ok) throw new Error(`API ${res.status}`);
                const data = await res.json();

                if (Array.isArray(data) && data.length > 0) {
                    const imageUrls = data
                        .filter((item: any) => item.resource_type === "image" && item.secure_url)
                        .map((item: any) => item.secure_url);

                    if (imageUrls.length > 0) {
                        setImages(imageUrls);
                        try {
                            sessionStorage.setItem(cacheKey, JSON.stringify(imageUrls));
                        } catch (e) { /* storage full */ }
                    }
                }
            } catch (err) {
                // Keep the FALLBACK_POOL already set as initial state
                console.warn("Cloudinary pool: using fallback images", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPool();
    }, []);

    // Helper to get a deterministic image from the pool based on an index
    const getRandomImage = (index: number = 0) => {
        const rawUrl = images[index % images.length];
        return transformCloudinary(rawUrl);
    };

    return { images, getRandomImage, loading };
}
