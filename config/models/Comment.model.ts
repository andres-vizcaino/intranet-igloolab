import { IUser } from './User.model'

export interface IComment {
  id: number
  body: string
  createdAt: number
  author: IUser
}
