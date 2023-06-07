import { Profile } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import NextCors from 'nextjs-cors'

type Data =
  | {
      id: string
      email: string | null
      name: string | null
      profile: Profile | null
    }[]
  | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Run the cors middleware
  // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

  const user = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      profile: true,
      image: true,
    },
  })

  res.status(200).json(user)
}
