import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Congrat } from '@prisma/client'

type Data = Congrat[] | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const congrats = await prisma.congrat.findMany({
    include: {
      author: true,
      from: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  res.status(200).json(congrats)
}
