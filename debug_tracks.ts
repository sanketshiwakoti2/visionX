
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import connectDB from "./src/lib/db";
import Track from "./src/models/Track";

// Manually set URI if dotenv fails (fallback)
if (!process.env.MONGODB_URI) {
    console.log("MONGODB_URI not found in env, checking hardcoded or arguments...");
}

async function debug() {
    try {
        await connectDB();
        console.log("Connected to DB");

        const tracks = await Track.find({});
        console.log("--- ALL TRACKS ---");
        tracks.forEach(t => {
            console.log(`Title: ${t.title}, Icon: '${t.icon}'`);
        });
        console.log("------------------");

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

debug();
