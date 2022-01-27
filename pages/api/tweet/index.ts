import { Tweet } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type Data = Tweet[] | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
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
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  res.status(200).json(tweets)
}
