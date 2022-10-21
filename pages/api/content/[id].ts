import { Content } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type Data = Content[] | Content | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query

  if (req.method === 'DELETE') {
    const response = await prisma.content.delete({
      where: {
        id: String(id),
      },
    })

    res.status(200).json(response)
  }

  if (req.method === 'POST') {
    const { userId } = req.body
    const response = await prisma.content.update({
      where: {
        id: String(id),
      },
      data: {
        likesBy: {
          connect: {
            id: userId,
          },
        },
      },
    })

    res.status(200).json(response)
  }

  if (req.method === 'PUT') {
    const { userId } = req.body
    const response = await prisma.content.update({
      where: {
        id: String(id),
      },
      data: {
        likesBy: {
          disconnect: {
            id: userId,
          },
        },
      },
    })

    res.status(200).json(response)
  }

  if (req.method === 'GET') {
    const response = await prisma.content.findMany({
      where: {
        typeContent: String(id),
      },
      include: {
        owner: true,
        likesBy: true,
      },
    })

    res.status(200).json(response)
  }
}
