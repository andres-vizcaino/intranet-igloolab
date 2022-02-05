import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Tweet } from '@prisma/client'

type Data = Tweet

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const { body, userId } = req.body
        const response = await prisma.tweet.create({
            data: {
                body,
                author: {
                    connect: {
                        id: userId,
                    },
                },
            },
        })

        res.status(200).json(response)
    }
}
