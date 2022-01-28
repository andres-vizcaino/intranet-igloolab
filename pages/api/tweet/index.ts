import { Tweet } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type Data = Tweet[] | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tweets = await prisma.tweet.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  res.status(200).json(tweets)
}
