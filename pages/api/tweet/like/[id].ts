import { Tweet } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type Data = Tweet | null

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { id } = req.query

    if (req.method === 'POST') {
        const { userId } = req.body
        const response = await prisma.tweet.update({
            where: {
                id: Number(id),
            },
            data: {
                likesBy: {
                    connect: {
                        id: userId,
                    },
                },
            },
        })

        res.status(200).json(response)
    }

    if (req.method === 'PUT') {
        const { userId } = req.body
        const response = await prisma.tweet.update({
            where: {
                id: Number(id),
            },
            data: {
                likesBy: {
                    disconnect: {
                        id: userId,
                    },
                },
            },
        })

        res.status(200).json(response)
    }
}
