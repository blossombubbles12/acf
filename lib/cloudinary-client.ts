/**
 * Client-side utility for Cloudinary URL transformations.
 * This file MUST NOT import the 'cloudinary' Node.js SDK to avoid 'fs' module errors in the browser.
 */

export const transformCloudinary = (url: string | null | undefined, options = "f_auto,q_auto,g_auto,c_fill") => {
    if (!url || !url.includes("cloudinary.com")) return url || "";
    // Avoid double transformation
    if (url.includes(options)) return url;

    if (url.includes("/upload/")) {
        return url.replace("/upload/", `/upload/${options}/`);
    }
    return url;
};
