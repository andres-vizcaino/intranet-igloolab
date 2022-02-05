// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@prisma/client'
import prisma from 'lib/prisma'

type Data = {
  name: string
  users: User[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const users = await prisma.user.findMany()

  res.status(200).json({ name: 'John Doe', users })
}
