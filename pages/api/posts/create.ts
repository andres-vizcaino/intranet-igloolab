import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Post } from '@prisma/client'

type Data = Post

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { title, slug, content, published, authorId } = req.body
    const response = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        published,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    })

    res.status(200).json(response)
  }
}
