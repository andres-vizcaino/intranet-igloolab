import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Category } from '@prisma/client'

type Data = Category[] | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  res.status(200).json(categories)
}
