import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { PostCreative } from '@prisma/client'

type Data = PostCreative[] | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const PostCreatives = await prisma.postCreative.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  res.status(200).json(PostCreatives)
}
