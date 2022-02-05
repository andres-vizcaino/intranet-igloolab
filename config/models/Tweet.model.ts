import { User } from '@prisma/client'

export interface ITweet {
    id: number
    body: string
    createdAt: number
    userId: string
    author: User
    likesBy: User[]
}
