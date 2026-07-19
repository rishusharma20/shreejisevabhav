require("dotenv").config();
const mongoose = require("mongoose");
const Collection = require("./src/models/Collection.model");
const Product = require("./src/models/Product.model");
const ProductVariant = require("./src/models/ProductVariant.model");

async function seedData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        console.log("Connected to MongoDB. Seeding Phase 1 Data...");

        // Clear existing to avoid duplicates during test
        await Collection.deleteMany({});
        await Product.deleteMany({});
        await ProductVariant.deleteMany({});

        // 1. Insert Collections
        const collections = [
            {
                name: "Thakurji's Summer Collection",
                slug: "thakurjis-summer-collection",
                description: "Light, breathable cotton poshak for the scorching Vrindavan summers.",
                bannerImage: "/images/collections/summer-banner.jpg",
                thumbnailImage: "/images/collections/summer-thumb.jpg",
                category: "Poshak"
            },
            {
                name: "Divine Jewelry",
                slug: "divine-jewelry",
                description: "Handcrafted golden and silver jewelry set with precious stones.",
                bannerImage: "/images/collections/jewelry-banner.jpg",
                thumbnailImage: "/images/collections/jewelry-thumb.jpg",
                category: "Accessories"
            },
            {
                name: "Janmashtami Specials",
                slug: "janmashtami-specials",
                description: "Exclusive heavily embroidered attire for the grand festival.",
                bannerImage: "/images/collections/janmashtami-banner.jpg",
                thumbnailImage: "/images/collections/janmashtami-thumb.jpg",
                category: "Poshak",
                isFeatured: true
            }
        ];

        const insertedCollections = await Collection.insertMany(collections);
        console.log("Collections seeded.");

        // 2. Insert Products
        const products = [
            {
                name: "Golden Lotus Poshak",
                slug: "golden-lotus-poshak",
                shortDescription: "A beautiful golden poshak.",
                description: "Intricately woven with real zari, perfect for evening darshan.",
                collectionId: insertedCollections[0]._id,
                category: "Poshak",
                isFeatured: true
            },
            {
                name: "Peacock Feather Crown",
                slug: "peacock-feather-crown",
                shortDescription: "Elegant Mukut with peacock feathers.",
                description: "Studded with artificial diamonds and real peacock feathers.",
                collectionId: insertedCollections[1]._id,
                category: "Accessories",
                isFeatured: true
            },
            {
                name: "Silver Flute (Bansuri)",
                slug: "silver-flute-bansuri",
                shortDescription: "Pure silver bansuri.",
                description: "A finely crafted silver bansuri to adorn Thakurji's hands.",
                collectionId: insertedCollections[1]._id,
                category: "Accessories",
                isFeatured: false
            }
        ];

        const insertedProducts = await Product.insertMany(products);
        console.log("Products seeded.");

        // 3. Insert Product Variants (Prices and Images)
        const variants = [
            {
                productId: insertedProducts[0]._id,
                size: "4 Inch",
                price: 1500,
                quantity: 10,
                images: ["/images/products/golden-poshak-1.jpg", "/images/products/golden-poshak-2.jpg"]
            },
            {
                productId: insertedProducts[0]._id,
                size: "6 Inch",
                price: 2000,
                quantity: 5,
                images: ["/images/products/golden-poshak-1.jpg"]
            },
            {
                productId: insertedProducts[1]._id,
                size: "Standard",
                price: 800,
                quantity: 20,
                images: ["/images/products/mukut-1.jpg"]
            },
            {
                productId: insertedProducts[2]._id,
                size: "Standard",
                price: 3500,
                quantity: 2,
                images: ["/images/products/flute-1.jpg"]
            }
        ];

        await ProductVariant.insertMany(variants);
        console.log("Product Variants seeded.");

        console.log("✅ Database successfully seeded with Phase 1 data!");

    } catch (error) {
        console.error("❌ Error seeding database:", error);
    } finally {
        mongoose.disconnect();
        process.exit(0);
    }
}

seedData();
