import { PostCreative } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type Data = PostCreative | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query

  if (req.method === 'GET') {
    const post = await prisma.postCreative.findUnique({
      where: {
        id: id as string,
      },
      include: {
        author: true,
        Category: true,
      },
    })

    res.status(200).json(post)
  }

  if (req.method === 'DELETE') {
    const post = await prisma.postCreative.delete({
      where: {
        id: id as string,
      },
    })

    res.status(200).json(post)
  }
}
