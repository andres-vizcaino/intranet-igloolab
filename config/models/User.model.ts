import { Profile } from '@prisma/client'
import { IPost } from './Post.model'
import { ITweet } from './Tweet.model'

export interface IUser {
  id: string
  email: string | null
  emailVerified: Date | null
  profile: Profile | null
  name: string | null
  image: string
  tweets: ITweet[]
  posts: IPost[]
}
