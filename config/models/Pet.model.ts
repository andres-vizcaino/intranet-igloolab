import { IUser } from './User.model'

export interface IPet {
  id: string
  name: string
  photo: string
  ownerId: string
  owner: IUser
  createdAt: string
}
