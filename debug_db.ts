
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import connectDB from "./src/lib/db";
import EventSettings from "./src/models/EventSettings";
import HeroSection from "./src/models/HeroSection";

async function debug() {
    try {
        await connectDB();
        console.log("Connected to DB");

        const settings = await EventSettings.findOne({});
        console.log("Settings Logo URL:", settings?.logoUrl);

        const hero = await HeroSection.findOne({});
        console.log("Hero BG URL:", hero?.backgroundImageUrl);

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

debug();
