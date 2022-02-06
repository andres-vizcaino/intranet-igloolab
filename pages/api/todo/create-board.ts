import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Board } from '@prisma/client'

type Data = Board

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { name, description, authorId } = req.body
    const response = await prisma.board.create({
      data: {
        name,
        description,
        authorId,
      },
    })

    res.status(200).json(response)
  }
}
