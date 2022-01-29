import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type Data = User | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query

  const user = await prisma.user.findUnique({
    where: {
      id: id as string,
    },
    select: {
      id: true,
      email: true,
      name: true,
      profile: true,
      image: true,
      emailVerified: true,
      tweets: {
        include: {
          author: true,
          likesBy: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      posts: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  res.status(200).json(user)
}
