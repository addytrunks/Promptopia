import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database"
import mongoose from "mongoose"


export const GET = async (req,res) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts),{status:200})
    } catch (error) {
        console.log(error.message)
    }
}