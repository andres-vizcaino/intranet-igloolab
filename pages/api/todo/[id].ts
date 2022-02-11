import { Board } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type Data = Board | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query

  if (req.method === 'GET') {
    const board = await prisma.board.findUnique({
      where: {
        id: id as string,
      },
      include: {
        columns: {
          include: {
            items: true,
          },
        },
      },
    })

    res.status(200).json(board)
  }

  if (req.method === 'DELETE') {
    const board = await prisma.board.delete({
      where: {
        id: id as string,
      },
    })

    res.status(200).json(board)
  }
}
