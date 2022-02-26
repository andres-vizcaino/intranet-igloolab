import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Pet } from '@prisma/client'

type Data = Pet[] | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const pets = await prisma.pet.findMany({
    include: {
      owner: true,
      likesBy: true,
    },
    orderBy: [
      {
        likesBy: {
          _count: 'desc',
        },
      },
      {
        createdAt: 'desc',
      },
    ],
  })

  res.status(200).json(pets)
}
