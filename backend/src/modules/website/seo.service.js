const Product = require("../../models/Product.model");
const Collection = require("../../models/Collection.model");
const Festival = require("../../models/Festival.model");

/**
 * Dynamically generates an XML Sitemap structure for Production SEO.
 * This ensures Google always indexes the latest offerings and active festivals.
 */
const generateDynamicSitemap = async (baseUrl) => {
    const urls = [];
    const now = new Date();

    // 1. Static Routes
    urls.push({ loc: `${baseUrl}/`, changefreq: "daily", priority: "1.0" });
    urls.push({ loc: `${baseUrl}/collections`, changefreq: "daily", priority: "0.9" });
    urls.push({ loc: `${baseUrl}/festivals`, changefreq: "daily", priority: "0.9" });

    // 2. Active Products
    const products = await Product.find({ isActive: true }).select("slug updatedAt");
    products.forEach(p => {
        urls.push({
            loc: `${baseUrl}/product/${p.slug}`,
            lastmod: p.updatedAt.toISOString(),
            changefreq: "weekly",
            priority: "0.8"
        });
    });

    // 3. Active Collections
    const collections = await Collection.find({ isActive: true }).select("slug updatedAt");
    collections.forEach(c => {
        urls.push({
            loc: `${baseUrl}/collection/${c.slug}`,
            lastmod: c.updatedAt.toISOString(),
            changefreq: "weekly",
            priority: "0.8"
        });
    });

    // 4. Active/Upcoming Festivals
    const festivals = await Festival.find({ 
        isActive: true, 
        endDate: { $gte: now } 
    }).select("slug updatedAt");
    
    festivals.forEach(f => {
        urls.push({
            loc: `${baseUrl}/festival/${f.slug}`,
            lastmod: f.updatedAt.toISOString(),
            changefreq: "daily", // High frequency for active festivals
            priority: "0.9"
        });
    });

    return urls;
};

module.exports = {
    generateDynamicSitemap
};
