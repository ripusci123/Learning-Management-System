import  mongoose  from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        if(connectionInstance){
            console.log(`MONGO DB IS CONNECTED!! DB HOST: ${connectionInstance.connection.host}`);
        }
    } catch (error) {
        console.log("MONGO DB CONNECTION FAILED :",error);
        process.exit(1)
    }
}

export default connectDB;