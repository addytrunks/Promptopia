"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState,useEffect } from "react"
import Profile from "@components/Profile"

const ProfilePage = () => {

    const {data:session} = useSession()
    const [posts,setPosts] = useState([])
    const router = useRouter()

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async(post) => {

      const hasconfirmed = confirm('Do you want to delete')

      if (hasconfirmed){
        await fetch( `api/prompt/${post._id.toString()}`,{
          method:'DELETE'
        })
        const filteredPosts = posts.filter(p => p._id !== post.id)
        setPosts(filteredPosts)
      }
      
    }

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`)
          const data = await response.json()
          setPosts(data)
        }

        if(session?.user.id){
            fetchPosts()
        }
      },[])

  return (
    <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default ProfilePage