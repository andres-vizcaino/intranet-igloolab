import { User } from '@prisma/client'

export interface ITweet {
  id: number
  body: string
  createdAt: number
  updatedAt: number
  userId: string
  author: User
  like?: number
}
