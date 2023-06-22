import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery',true)

    if(isConnected){
        console.log('Already Connected')
        return;
    }
    else{
        try {
            await mongoose.connect(process.env.MONGODB_URI,{
                dbName:'share_prompt',
                useNewUrlParser:true,
                useUnifiedTopology:true,
            })
            isConnected = true 
            console.log('Connected')
        } catch (error) {
            console.log(error.message)
        }
    }
}