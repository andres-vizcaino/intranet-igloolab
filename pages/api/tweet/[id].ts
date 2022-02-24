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

  if (req.method === 'GET') {
    if (!isNaN(Number(id))) {
      // FIXME: Este metodo esta retornando un arreglo con todos los tweets...
      const response = await prisma.tweet.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          author: true,
          likesBy: true,
          Comment: {
            include: {
              author: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      })

      res.status(200).json(response)
    } else {
      res.status(200).json(null)
    }
  }
}
