import Prompt from "@models/Prompt"
import { connectToDB } from "@utils/database"


export const POST = async (req) => {
    const {userId,prompt,tags} = await req.json()
    try {
        await connectToDB()
        const newPrompt = new Prompt({
            creator:userId,
            prompt:prompt,
            tags:tags,
        })

        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt),{status:201})
    } catch (error) {
        console.log(error.message)
    }
}