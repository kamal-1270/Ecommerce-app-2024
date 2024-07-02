import mongoose from "mongoose"

const connectDB= async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
            console.log(`Conneted to mongodb database ${conn.connection.host}`.bgMagenta.white)
    }catch(error){
        console.log(`Error in mongodb ${error}`.bgRed.white)
    }
}

export default connectDB;