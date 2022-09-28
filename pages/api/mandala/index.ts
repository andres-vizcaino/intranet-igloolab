import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Mandala } from '@prisma/client'

type Data = Mandala[] | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const mandalas = await prisma.mandala.findMany({
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

  res.status(200).json(mandalas)
}
