import { ItemColumn } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type Data = ItemColumn | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query
  const { columnBoardId } = req.body

  if (req.method === 'PUT') {
    const item = await prisma.itemColumn.update({
      where: {
        id: id as string,
      },
      data: {
        columnBoardId,
      },
    })

    res.status(200).json(item)
  }

  if (req.method === 'DELETE') {
    const item = await prisma.itemColumn.delete({
      where: {
        id: id as string,
      },
    })

    res.status(200).json(item)
  }
}
