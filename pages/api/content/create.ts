import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Content } from '@prisma/client'

type Data = Content

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { name, photo, ownerId, description, typeContent } = req.body
    const response = await prisma.content.create({
      data: {
        name,
        photo,
        owner: {
          connect: {
            id: ownerId,
          },
        },
        description,
        typeContent,
      },
    })

    res.status(200).json(response)
  }
}
