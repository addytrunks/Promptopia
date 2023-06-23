import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database"
import mongoose from "mongoose"


export const GET = async (req,{params}) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({creator:params.id}).populate('creator')

        return new Response(JSON.stringify(prompts),{status:200})
    } catch (error) {
        console.log(error.message)
    }
}