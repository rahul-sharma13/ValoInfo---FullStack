import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URL);
        console.log(`\nMongoDb connected !! DB HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error",error);
        process.exit(1)
    }
}

export default connectDb;