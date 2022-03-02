import { Congrat } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type Data = Congrat | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query

  if (req.method === 'DELETE') {
    const response = await prisma.congrat.delete({
      where: {
        id: String(id),
      },
    })

    res.status(200).json(response)
  }
}
