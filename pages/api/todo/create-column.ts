import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { ColumnBoard } from '@prisma/client'

type Data = ColumnBoard

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { title, boardId } = req.body
    const response = await prisma.columnBoard.create({
      data: {
        title,
        boardId,
      },
    })

    res.status(200).json(response)
  }
}
