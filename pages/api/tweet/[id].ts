import { Tweet } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type Data = Tweet | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query
  if (req.method === 'DELETE') {
    const response = await prisma.tweet.delete({
      where: {
        id: Number(id),
      },
    })
    res.status(200).json(response)
  }

  if (req.method === 'PUT') {
    const { like } = req.body
    const response = await prisma.tweet.update({
      where: {
        id: Number(id),
      },
      data: {
        like: Number(like),
      },
    })
    res.status(200).json(response)
  }
}
