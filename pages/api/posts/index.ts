import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Post } from '@prisma/client'

type Data = Post[] | null

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const posts = await prisma.post.findMany({
        include: {
            author: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    res.status(200).json(posts)
}
