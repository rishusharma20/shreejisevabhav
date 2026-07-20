require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./src/models/Product.model");

async function test() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/shreeji_seva_bhav_v1");
        
        const p = await Product.create({
            name: "Test Name",
            shortDescription: "desc",
            description: "desc",
            collectionId: new mongoose.Types.ObjectId(),
            category: "Poshak"
        });
        console.log("Success");
    } catch(e) {
        console.error(e);
    } finally {
        mongoose.disconnect();
    }
}
test();
