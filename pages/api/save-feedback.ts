import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type Data = {
  error?: string
  text?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('new request')
  if (req.method !== 'POST') return res.status(405).end()

  const { prompt, helpful, response } = req.body

  if (!prompt) return res.status(400).json({ error: 'Prompt is required' })
  if (!helpful) return res.status(400).json({ error: 'Helpful is required' })
  if (!response) return res.status(400).json({ error: 'Response is required' })

  console.log('request: todos los campos válidos')

  const responsePrisma = await prisma.responseAI.create({
    data: {
      prompt,
      helpful,
      response,
    },
  })

  console.log('response: ', response)

  res.status(200).json({ text: responsePrisma.id.toString() })
}
