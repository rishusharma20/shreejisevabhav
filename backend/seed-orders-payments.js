require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/User.model");
const Product = require("./src/models/Product.model");
const ProductVariant = require("./src/models/ProductVariant.model");
const Address = require("./src/models/Address.model");
const Order = require("./src/models/Order.model");
const Payment = require("./src/models/Payment.model");

async function seedOrdersAndPayments() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/shreeji_seva_bhav_v1");
        console.log("Connected to MongoDB. Seeding Orders and Payments...");

        // Get test user
        const testUser = await User.findOne({ email: "test@gmail.com" });
        if (!testUser) {
            console.error("Test user not found. Please run create-users.js first.");
            process.exit(1);
        }

        // Create Address if not exists
        let address = await Address.findOne({ userId: testUser._id });
        if (!address) {
            address = await Address.create({
                userId: testUser._id,
                name: "Test Devotee",
                phone: "+918888888888",
                houseNo: "123",
                street: "Vrindavan Parikrama Marg",
                city: "Vrindavan",
                state: "Uttar Pradesh",
                pincode: "281121",
                isDefault: true
            });
            console.log("Created Address for test user.");
        }

        // Get some products and variants
        const products = await Product.find().limit(2);
        if (products.length === 0) {
            console.error("No products found. Please run seed-phase1.js first.");
            process.exit(1);
        }

        const variant1 = await ProductVariant.findOne({ productId: products[0]._id });
        const variant2 = products.length > 1 ? await ProductVariant.findOne({ productId: products[1]._id }) : null;

        // Clear existing orders and payments for this user for clean seed
        await Order.deleteMany({ userId: testUser._id });
        await Payment.deleteMany({ userId: testUser._id });

        // 1. Create a Pending Payment Order (ONLINE)
        const payment1 = await Payment.create({
            userId: testUser._id,
            checkoutId: new mongoose.Types.ObjectId(), // Fake checkout ID
            paymentMethod: "ONLINE",
            subtotal: 1500,
            totalAmount: 1500,
            paymentStatus: "UNDER_VERIFICATION",
            utrNumber: "UTR987654321",
            screenshotUrl: "https://via.placeholder.com/150"
        });

        await Order.create({
            userId: testUser._id,
            paymentId: payment1._id,
            addressId: address._id,
            products: [
                {
                    productId: products[0]._id,
                    variantId: variant1._id,
                    productName: products[0].name,
                    variantSize: variant1.size,
                    quantity: 1,
                    priceAtPurchase: 1500,
                    imageAtPurchase: variant1.images[0]
                }
            ],
            subtotal: 1500,
            totalAmount: 1500,
            paymentMethod: "ONLINE",
            orderStatus: "UNDER_VERIFICATION"
        });

        // 2. Create a Completed Payment Order (CASH)
        const payment2 = await Payment.create({
            userId: testUser._id,
            checkoutId: new mongoose.Types.ObjectId(), // Fake checkout ID
            paymentMethod: "CASH",
            subtotal: 3500,
            totalAmount: 3500,
            paymentStatus: "PAYMENT_APPROVED"
        });

        await Order.create({
            userId: testUser._id,
            paymentId: payment2._id,
            addressId: address._id,
            products: variant2 ? [
                {
                    productId: products[1]._id,
                    variantId: variant2._id,
                    productName: products[1].name,
                    variantSize: variant2.size,
                    quantity: 1,
                    priceAtPurchase: 3500,
                    imageAtPurchase: variant2.images[0]
                }
            ] : [],
            subtotal: 3500,
            totalAmount: 3500,
            paymentMethod: "CASH",
            orderStatus: "PREPARING"
        });

        // 3. Create a Rejected Payment Order (ONLINE)
        const payment3 = await Payment.create({
            userId: testUser._id,
            checkoutId: new mongoose.Types.ObjectId(), // Fake checkout ID
            paymentMethod: "ONLINE",
            subtotal: 2000,
            totalAmount: 2000,
            paymentStatus: "PAYMENT_REJECTED",
            utrNumber: "UTR123456789",
            screenshotUrl: "https://via.placeholder.com/150"
        });

        await Order.create({
            userId: testUser._id,
            paymentId: payment3._id,
            addressId: address._id,
            products: [
                {
                    productId: products[0]._id,
                    variantId: variant1._id,
                    productName: products[0].name,
                    variantSize: variant1.size,
                    quantity: 1,
                    priceAtPurchase: 2000,
                    imageAtPurchase: variant1.images[0]
                }
            ],
            subtotal: 2000,
            totalAmount: 2000,
            paymentMethod: "ONLINE",
            orderStatus: "PAYMENT_REJECTED"
        });

        console.log("✅ Successfully seeded 3 Orders and Payments for testing!");

    } catch (error) {
        console.error("❌ Error seeding orders and payments:", error);
    } finally {
        mongoose.disconnect();
        process.exit(0);
    }
}

seedOrdersAndPayments();
