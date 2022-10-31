import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Content } from '@prisma/client'

type Data = Content[] | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const contents = await prisma.content.findMany({
    include: {
      owner: true,
      likesBy: true,
    },
    orderBy: [
      {
        likesBy: {
          _count: 'desc',
        },
      },
      {
        createdAt: 'desc',
      },
    ],
  })

  res.status(200).json(contents)
}
