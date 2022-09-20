import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type Data = User | null | any

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { id } = req.query

    const response = await prisma.amorAmistad.findFirst({
        where: {
            friendId: id as string
        },
    });

    const user = await prisma.user.findFirst({
        where: {
            id: response?.loveId as string
        },
        select: {
            name: true,
            image: true
        }
    })

    res.status(200).json({ user, message: response?.message })
}
