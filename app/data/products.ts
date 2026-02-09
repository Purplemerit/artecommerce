export const products = [
    // --- Collected By Many Section (IDs 1-3) ---
    {
        id: 1,
        name: "Italian Landscape Etching",
        price: 352.00,
        oldPrice: 450.00,
        type: "Classic Art",
        description: "A beautiful etching depicting a serene Italian landscape with ancient ruins and lush foliage. Perfect for adding a touch of history and elegance to any room.",
        images: [
            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg (1).png",
            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg (2).png",
        ]
    },
    {
        id: 2,
        name: "Botanical Bird Study",
        price: 195.00,
        oldPrice: 250.00,
        type: "Studies",
        description: "A detailed botanical study featuring a vibrant blue bird perched on a branch. This piece captures the delicate beauty of nature.",
        images: [
            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg (2).png",
            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg (1).png"
        ]
    },
    {
        id: 3,
        name: "Vintage Floral Bouquet",
        price: 420.00,
        oldPrice: 550.00,
        type: "Floral Art",
        description: "An antique-style floral arrangement rich in color and texture. This timeless piece brings a romantic flair to your interior.",
        images: [
            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg (3).png",
            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg.png"
        ]
    },
    // --- Shop Our Collection Section (IDs 4-9) ---
    {
        id: 4,
        name: "Classic Art Series 1",
        price: 85.00,
        oldPrice: 100.00,
        type: "Collection",
        description: "Part of our exclusive Classic Art Series, this piece interprets traditional themes with a modern sensibility.",
        images: [
            "/images/unsplash_MO5qO9xpZhA.png",
            "/images/unsplash_nimElTcTNyY.png"
        ]
    },
    {
        id: 5,
        name: "Classic Art Series 2",
        price: 170.00,
        oldPrice: 200.00,
        type: "Collection",
        description: "A stunning addition to any gallery wall, offering distinct visual textures and a calming color palette.",
        images: [
            "/images/unsplash_nimElTcTNyY.png",
            "/images/unsplash_MO5qO9xpZhA.png"
        ]
    },
    {
        id: 6,
        name: "Classic Art Series 3",
        price: 255.00,
        oldPrice: 300.00,
        type: "Collection",
        description: "Elegant and understated, this artwork serves as a perfect focal point for minimalist or classical interiors.",
        images: [
            "/images/643677baed1627ea77898fb7_product-hover01.jpg (1).png",
            "/images/643677baed1627ea77898fb7_product-hover01.jpg.png"
        ]
    },
    {
        id: 7,
        name: "Classic Art Series 4",
        price: 340.00,
        oldPrice: 400.00,
        type: "Collection",
        description: "Rich tones and masterful composition make this piece a standout selection for the discerning collector.",
        images: [
            "/images/643677baed1627ea77898fb7_product-hover01.jpg.png",
            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg.png"
        ]
    },
    {
        id: 8,
        name: "Classic Art Series 5",
        price: 425.00,
        oldPrice: 500.00,
        type: "Collection",
        description: "A harmonious blend of abstraction and realism, creating a visual narrative that invites contemplation.",
        images: [
            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg.png",
            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg (3).png"
        ]
    },
    {
        id: 9,
        name: "Classic Art Series 6",
        price: 510.00,
        oldPrice: 600.00,
        type: "Collection",
        description: "The finale of our Classic Art Series, representing the pinnacle of our curated collection.",
        images: [
            "/images/unsplash_MO5qO9xpZhA (1).png",
            "/images/unsplash_MO5qO9xpZhA.png"
        ]
    },
    // --- Additional Products (IDs 101+) ---
    {
        id: 101,
        name: "Wood Wick Candle",
        price: 72.00,
        oldPrice: 90.00,
        type: "Candles",
        description: "Experience the soothing sound of a crackling fire with our premium Wood Wick Candle. Scented with natural oils.",
        images: [
            "/images/unsplash_MO5qO9xpZhA.png",
            "/images/unsplash_nimElTcTNyY.png"
        ]
    },
    {
        id: 102,
        name: "Jelly Gel Candles",
        price: 65.00,
        oldPrice: 80.00,
        type: "Candles",
        description: "Translucent and mesmerizing, these Jelly Gel Candles add a modern touch to your home decor.",
        images: [
            "/images/unsplash_nimElTcTNyY.png",
            "/images/unsplash_MO5qO9xpZhA.png"
        ]
    },
    {
        id: 103,
        name: "Floral Still Life",
        price: 65.00,
        oldPrice: 85.00,
        type: "Art",
        description: "A classic still life composition featuring a vibrant floral arrangement.",
        images: [
            "/images/643677baed1627ea77898fb7_product-hover01.jpg (1).png",
            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg.png"
        ]
    },
];

// Helper to get image URL based on environment variable
export function getProductImage(path: string) {
    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }
    const baseUrl = process.env.NEXT_PUBLIC_S3_BUCKET_URL;
    if (baseUrl) {
        // Remove leading slash if present in path to avoid double slashes
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
        return `${cleanBase}${cleanPath}`;
    }
    return path;
}

export function getProduct(id: number) {
    return products.find(p => p.id === id) || products[0];
}
