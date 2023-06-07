import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import NextCors from 'nextjs-cors'

type Data = User | null

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

  const { id } = req.query

  const user = await prisma.user.findUnique({
    where: {
      id: id as string,
    },
    select: {
      id: true,
      email: true,
      name: true,
      profile: true,
      image: true,
      emailVerified: true,
      tweets: {
        include: {
          author: true,
          likesBy: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      posts: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  res.status(200).json(user)
}
