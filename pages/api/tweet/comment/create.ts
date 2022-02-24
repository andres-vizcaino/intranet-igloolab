import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Comment } from '@prisma/client'

type Data = Comment

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { body, userId, tweetId } = req.body
    const response = await prisma.comment.create({
      data: {
        body,
        author: {
          connect: {
            id: userId,
          },
        },
        tweet: {
          connect: {
            id: Number(tweetId),
          },
        },
      },
    })

    res.status(200).json(response)
  }
}
