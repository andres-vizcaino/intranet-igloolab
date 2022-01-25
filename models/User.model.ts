import { Profile } from '@prisma/client'

export interface IUser {
  id: string
  email: string | null
  emailVerified: Date | null
  profile: Profile | null
  name: string | null
  image: string
}
