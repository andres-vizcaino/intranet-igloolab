import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { PostCreative } from '@prisma/client'

type Data = PostCreative

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { title, content, categoryId, authorId, image } = req.body
    const response = await prisma.postCreative.create({
      data: {
        title,
        image,
        content,
        author: {
          connect: {
            id: authorId,
          },
        },
        Category: {
          connect: {
            id: categoryId,
          },
        },
      },
    })

    res.status(200).json(response)
  }
}
