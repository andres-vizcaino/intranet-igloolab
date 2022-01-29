import { IPost } from './Post.model'
import { IProfile } from './Profile.model'
import { ITweet } from './Tweet.model'

export interface IUser {
  id: string
  email: string | null
  emailVerified: Date | null
  profile: IProfile | null
  name: string | null
  image: string
  tweets: ITweet[]
  posts: IPost[]
}
