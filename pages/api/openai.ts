import { Pet } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

const { OPENAI_API_KEY } = process.env

const API_URL = 'https://api.openai.com/v1/completions'

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

  const { prompt } = req.body

  if (!prompt) return res.status(400).json({ error: 'Prompt is required' })

  console.log('request: todos los campos válidos')
  console.log({ prompt })

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: `${prompt}, todo en una linea sin generar espacios \n\n`,
      temperature: 0,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['\n\n'],
    }),
  })

  const data = await response.json()

  return res.status(200).json({
    text: data.choices[0].text.trim(),
  })
}
