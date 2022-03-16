import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Category } from '@prisma/client'

type Data = Category

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { name } = req.body
    const response = await prisma.category.create({
      data: {
        name,
      },
    })

    res.status(200).json(response)
  }
}
