import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Board } from '@prisma/client'

type Data = Board[] | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const boards = await prisma.board.findMany()

  res.status(200).json(boards)
}
