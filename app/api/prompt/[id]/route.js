import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database"
import mongoose from "mongoose"

export const GET = async (req,{params}) => {
    try {
        await connectToDB();
        const prompts = await Prompt.findById(params.id).populate('creator')

        if(!prompts){
            return new Response('Prompt Not Found',{status:404})
        }
        return new Response(JSON.stringify(prompts))
    } catch (error) {
        console.log(error.message)
    }
}

export const PATCH = async (req,{params}) => {
    const {prompt,tags} = await req.json()
    try {
        await connectToDB()
        const existingPrompt = await Prompt.findById(params.id)

        if(!existingPrompt){
            return new Response('Prompt Not Found',{status:404})
        }
        existingPrompt.prompt = prompt
        existingPrompt.tags= tags

        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt))
    } catch (error) {
        console.log(error.message)
    }
}

export const DELETE = async(req,{params}) => {
    try {
        await connectToDB()
        await Prompt.findOneAndRemove(params.id)
        return new Response('Prompt deleted',{status:201})
    } catch (error) {
        console.log(error.message)
    }
}