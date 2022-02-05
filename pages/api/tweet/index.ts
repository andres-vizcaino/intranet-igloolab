import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tweets = await prisma.tweet.findMany({
    select: {
      id: true,
      body: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      userId: true,
      likesBy: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  res.status(200).json(tweets)
}
