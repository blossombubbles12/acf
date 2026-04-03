import { transformCloudinary } from "./cloudinary-client";

const CLOUD = "dtw0ajpwa";
const FALLBACK_IDS = [
    "DSC_2000_utsl1t",
    "DSC_1992_cajnlm",
    "DSC_2143_bnj7d6",
    "v1741129532/acf/DSC_2000_utsl1t", // Adding some variation
];

export function getEventFallbackImage(id: number | string) {
    const seed = typeof id === "number" ? id : (id.length || 0);
    const publicId = FALLBACK_IDS[seed % FALLBACK_IDS.length];
    const url = `https://res.cloudinary.com/${CLOUD}/image/upload/${publicId}`;
    return transformCloudinary(url);
}
