import { ColumnBoard } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type Data = ColumnBoard | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query
  const { title } = req.body

  if (req.method === 'PUT') {
    const column = await prisma.columnBoard.update({
      where: {
        id: id as string,
      },
      data: {
        title: title as string,
      },
    })

    res.status(200).json(column)
  }

  if (req.method === 'DELETE') {
    const column = await prisma.columnBoard.delete({
      where: {
        id: id as string,
      },
    })

    res.status(200).json(column)
  }
}
