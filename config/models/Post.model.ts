import { IUser } from './User.model'

export interface IPost {
    id: number
    title: string
    slug: string
    content: string
    published: boolean
    authorId: number
    author: IUser
    createdAt: number
}
