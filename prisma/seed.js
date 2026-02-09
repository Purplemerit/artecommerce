const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const productsData = [
    {
        name: "Italian Landscape Etching",
        price: 352.00,
        oldPrice: 450.00,
        type: "PHYSICAL",
        description: "A beautiful etching depicting a serene Italian landscape with ancient ruins and lush foliage. Perfect for adding a touch of history and elegance to any room.",
        images: [
            "/images/643677baed1627ea77898fb7_product-hover01.jpg (1).png",
            "/images/643677baed1627ea77898fb7_product-hover01.jpg.png",
        ],
        category: "Classic Art",
        sku: "ART-ITA-001"
    },
    {
        name: "Botanical Bird Study",
        price: 195.00,
        oldPrice: 250.00,
        type: "PHYSICAL",
        description: "A detailed botanical study featuring a vibrant blue bird perched on a branch. This piece captures the delicate beauty of nature.",
        images: [
            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg (2).png",
            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg (1).png"
        ],
        category: "Studies",
        sku: "ART-BOT-002"
    },
    {
        name: "Vintage Floral Bouquet",
        price: 420.00,
        oldPrice: 550.00,
        type: "PHYSICAL",
        description: "An antique-style floral arrangement rich in color and texture. This timeless piece brings a romantic flair to your interior.",
        images: [
            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg (3).png",
            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg.png"
        ],
        category: "Floral Art",
        sku: "ART-VIN-003"
    },
    {
        name: "Classic Art Series 1",
        price: 85.00,
        oldPrice: 100.00,
        type: "PHYSICAL",
        description: "Part of our exclusive Classic Art Series, this piece interprets traditional themes with a modern sensibility.",
        images: [
            "/images/unsplash_MO5qO9xpZhA.png",
            "/images/unsplash_nimElTcTNyY.png"
        ],
        category: "Collection",
        sku: "ART-SER-001"
    },
    {
        name: "Classic Art Series 2",
        price: 170.00,
        oldPrice: 200.00,
        type: "PHYSICAL",
        description: "A stunning addition to any gallery wall, offering distinct visual textures and a calming color palette.",
        images: [
            "/images/unsplash_nimElTcTNyY.png",
            "/images/unsplash_MO5qO9xpZhA.png"
        ],
        category: "Collection",
        sku: "ART-SER-002"
    },
    {
        name: "Classic Art Series 3",
        price: 255.00,
        oldPrice: 300.00,
        type: "PHYSICAL",
        description: "Elegant and understated, this artwork serves as a perfect focal point for minimalist or classical interiors.",
        images: [
            "/images/643677baed1627ea77898fb7_product-hover01.jpg (1).png",
            "/images/643677baed1627ea77898fb7_product-hover01.jpg.png"
        ],
        category: "Collection",
        sku: "ART-SER-003"
    },
    {
        name: "Classic Art Series 4",
        price: 340.00,
        oldPrice: 400.00,
        type: "PHYSICAL",
        description: "Rich tones and masterful composition make this piece a standout selection for the discerning collector.",
        images: [
            "/images/643677baed1627ea77898fb7_product-hover01.jpg.png",
            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg.png"
        ],
        category: "Collection",
        sku: "ART-SER-004"
    },
    {
        name: "Classic Art Series 5",
        price: 425.00,
        oldPrice: 500.00,
        type: "PHYSICAL",
        description: "A harmonious blend of abstraction and realism, creating a visual narrative that invites contemplation.",
        images: [
            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg.png",
            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg (3).png"
        ],
        category: "Collection",
        sku: "ART-SER-005"
    },
    {
        name: "Classic Art Series 6",
        price: 510.00,
        oldPrice: 600.00,
        type: "PHYSICAL",
        description: "The finale of our Classic Art Series, representing the pinnacle of our curated collection.",
        images: [
            "/images/unsplash_MO5qO9xpZhA (1).png",
            "/images/unsplash_MO5qO9xpZhA.png"
        ],
        category: "Collection",
        sku: "ART-SER-006"
    },
    {
        name: "Wood Wick Candle",
        price: 72.00,
        oldPrice: 90.00,
        type: "PHYSICAL",
        description: "Experience the soothing sound of a crackling fire with our premium Wood Wick Candle. Scented with natural oils.",
        images: [
            "/images/unsplash_MO5qO9xpZhA.png",
            "/images/unsplash_nimElTcTNyY.png"
        ],
        category: "Candles",
        sku: "CAN-WOO-101"
    },
    {
        name: "Jelly Gel Candles",
        price: 65.00,
        oldPrice: 80.00,
        type: "PHYSICAL",
        description: "Translucent and mesmerizing, these Jelly Gel Candles add a modern touch to your home decor.",
        images: [
            "/images/unsplash_nimElTcTNyY.png",
            "/images/unsplash_MO5qO9xpZhA.png"
        ],
        category: "Candles",
        sku: "CAN-JEL-102"
    },
    {
        name: "Floral Still Life",
        price: 65.00,
        oldPrice: 85.00,
        type: "PHYSICAL",
        description: "A classic still life composition featuring a vibrant floral arrangement.",
        images: [
            "/images/643677baed1627ea77898fb7_product-hover01.jpg (1).png",
            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg.png"
        ],
        category: "Art",
        sku: "ART-FLO-103"
    },
];

async function main() {
    console.log('🌱 Starting database seed...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@art.com' },
        update: {},
        create: {
            email: 'admin@art.com',
            password: adminPassword,
            name: 'Admin User',
            role: 'ADMIN',
        },
    });

    console.log('✅ Created admin user:', admin.email);

    // Delete existing products to avoid conflicts and start fresh with real data
    await prisma.product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    for (const product of productsData) {
        const { id, ...data } = product;
        const created = await prisma.product.create({
            data: {
                ...data,
                quantity: 50, // Default quantity
            },
        });
        console.log('✅ Created product:', created.name);
    }

    console.log('🎉 Database seeded successfully with real assets!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
