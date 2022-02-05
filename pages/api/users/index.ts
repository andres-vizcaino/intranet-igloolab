import { Profile } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type Data =
    | {
          id: string
          email: string | null
          name: string | null
          profile: Profile | null
      }[]
    | null

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const user = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            profile: true,
            image: true,
        },
    })

    res.status(200).json(user)
}
