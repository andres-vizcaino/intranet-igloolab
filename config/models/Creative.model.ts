import { Category } from '@prisma/client'
import { IUser } from './User.model'

export interface ICreative {
  id: string
  image: string
  title: string
  author: IUser
  Category: Category
  content: string
  authorId: number
  createdAt: number
}
