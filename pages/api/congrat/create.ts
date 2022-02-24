import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Congrat } from '@prisma/client'

type Data = Congrat

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { message, typeCongrat, authorId, fromId, isAnonymous } = req.body
    const response = await prisma.congrat.create({
      data: {
        message,
        typeCongrat,
        author: {
          connect: {
            id: authorId,
          },
        },
        from: {
          connect: {
            id: fromId,
          },
        },
        isAnonymous,
      },
    })

    res.status(200).json(response)
  }
}
