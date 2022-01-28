import { Post } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type Data = Post | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { slug } = req.query

  if (req.method === 'GET') {
    const post = await prisma.post.findUnique({
      where: {
        slug: slug as string,
      },
      include: {
        author: true,
      },
    })

    res.status(200).json(post)
  }
}
