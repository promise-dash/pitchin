import prisma from '@/lib/client'
import { Post, User } from '@prisma/client'
import React from 'react'
import StartupCard from './StartupCard'

type StartupType = Post & { user: User };

const UseruserPosts = async({id}: {id: string}) => {

     const userPosts = await prisma.post.findMany({
        where: {
          userId: id
        },
        include:{
          user: true
        }
      })
  return (
    <div>{userPosts.length > 0 ? (
        userPosts.map((startup: StartupType) => (
          <StartupCard key={startup.id} post={startup} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}</div>
  )
}

export default UseruserPosts