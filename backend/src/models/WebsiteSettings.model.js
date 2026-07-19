const mongoose = require("mongoose");

const websiteSettingsSchema = new mongoose.Schema(
    {
        // We ensure there is only ever one document by enforcing a fixed key
        isSingleton: {
            type: Boolean,
            default: true,
            unique: true
        },
        websiteName: {
            type: String,
            default: "Shreeji Seva Bhav"
        },
        websiteDescription: {
            type: String,
            default: "A divine commerce platform inspired by the culture of Vrindavan."
        },
        websiteTheme: {
            primaryColor: { type: String, default: "#E28743" }, // SSB Orange
            logoUrl: { type: String, default: "" }
        },
        heroSection: {
            heading: { type: String, default: "Welcome To The Divine Darshan" },
            subheading: { type: String, default: "May Shri Radha Raman Ji's divine blessings forever remain upon your family." },
            backgroundMediaUrl: { type: String, default: "" },
            buttonText: { type: String, default: "Begin Your Divine Journey" },
            buttonLink: { type: String, default: "/collections" }
        },
        maintenanceMode: {
            type: Boolean,
            default: false
        },
        seoSettings: {
            metaTitle: { type: String, default: "Shreeji Seva Bhav - Divine Offerings from Vrindavan" },
            metaDescription: { type: String, default: "Experience the devotion of Vrindavan with authentic Poshaks, Shringars, and Divine Offerings." },
            keywords: { type: String, default: "Vrindavan, Laddu Gopal, Poshak, Shringar, Janmashtami" }
        },
        contactDetails: {
            email: { type: String, default: "support@shreejisevabhav.com" },
            phone: { type: String, default: "" }
        },
        socialLinks: {
            instagram: { type: String, default: "" },
            youtube: { type: String, default: "" },
            facebook: { type: String, default: "" }
        },
        aboutUs: {
            content: { type: String, default: "Shreeji Seva Bhav is dedicated to serving the divine." }
        },
        footer: {
            copyrightText: { type: String, default: "© 2024 Shreeji Seva Bhav. All rights reserved." },
            address: { type: String, default: "Vrindavan, UP, India" }
        }
    },
    {
        timestamps: true
    }
);

const WebsiteSettings = mongoose.model("WebsiteSettings", websiteSettingsSchema);
module.exports = WebsiteSettings;
