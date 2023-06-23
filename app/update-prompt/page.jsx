"use client"

import {useEffect, useState} from 'react'
import {useSession} from 'next-auth/react'
import { redirect, useRouter,useSearchParams } from 'next/navigation'
import Form from '@components/Form'

const EditPrompt = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')

    const [submitting,setSubmitting] = useState(false)
    const [post,setPost] = useState({
        prompt:'',
        tag:''
    })
    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true)

        if(!promptId) return alert('Prompt ID not found')

        try {
            const response = await fetch(`api/prompt/${promptId}`,{
                method:'PATCH',
                body:JSON.stringify({
                    prompt:post.prompt,
                    tags:post.tag
                })
            })

            if(response.ok){
                router.push('/')
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        const getPromptDetails = async() => {
            const response = await fetch(`api/prompt/${promptId}`)
            const data = await response.json()
            setPost({
                prompt:data.prompt,
                tag:data.tags
            })
        }
        if(promptId){
            getPromptDetails()
        }
    },[])

  return (
    <div>
        <Form 
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    </div>
  )
}

export default EditPrompt