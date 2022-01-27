import { User } from '@prisma/client'

export interface ITweet {
  id: number
  body: string
  createdAt: Date
  updatedAt: Date
  userId: string
  author: User
}
