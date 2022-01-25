import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Profile } from '@prisma/client'

type Data = Profile

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'PUT') {
    const { idUser, bio } = req.body
    const response = await prisma.profile.update({
      where: {
        userId: idUser,
      },
      data: {
        bio,
      },
    })

    res.status(200).json(response)
  }
}
