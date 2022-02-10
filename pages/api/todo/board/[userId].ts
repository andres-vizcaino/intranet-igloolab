import { Board } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type Data = Board[] | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userId } = req.query

  if (req.method === 'GET') {
    const board = await prisma.board.findMany({
      where: {
        authorId: userId as string,
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
}
