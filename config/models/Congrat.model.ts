import { TypeMessage } from 'config/constants/TypeMessage.enum'
import { IUser } from './User.model'

export interface ICongrat {
  id: string
  message: string
  typeCongrat: TypeMessage
  author: IUser
  from: IUser
  isAnonymous: boolean
  createdAt: string
}
