import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { ItemColumn } from '@prisma/client'

type Data = ItemColumn

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { description, columnBoardId } = req.body
    const response = await prisma.itemColumn.create({
      data: {
        description,
        columnBoardId,
      },
    })

    res.status(200).json(response)
  }
}
