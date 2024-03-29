import { User } from '@prisma/client'
import { IComment } from './Comment.model'

export interface ITweet {
  id: number
  body: string
  createdAt: number
  userId: string
  author: User
  image?: string | null
  likesBy: User[]
  Comment: IComment[]
}
