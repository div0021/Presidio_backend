import mongoose from "mongoose";

export async function db() {
    const dbUrl = process.env.MONGO_URL;

    try{
        await mongoose.connect(dbUrl);
        console.log("DB is connected...");
    }catch(error){
        console.log("DB is not connected...");
        process.exit(1);
    }
}