import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type Data = User | null | any

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { id } = req.query
    if (req.method === 'POST') {
        const { message } = req.body
        const responseLove = await prisma.amorAmistad.findFirst({
            where: {
                loveId: id as string
            }
        });
        await prisma.amorAmistad.update({
            where: {
                id: responseLove?.id as string
            },
            data: {
                message: message
            }
        });

        return res.status(200).json({ responseLove })
    }

    const response = await prisma.amorAmistad.findFirst({
        where: {
            loveId: id as string
        },
    });

    return res.status(200).json({ message: response?.message })
}
