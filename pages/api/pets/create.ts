import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Pet } from '@prisma/client'

type Data = Pet

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { name, photo, ownerId } = req.body
    const response = await prisma.pet.create({
      data: {
        name,
        photo,
        owner: {
          connect: {
            id: ownerId,
          },
        },
      },
    })

    res.status(200).json(response)
  }
}
