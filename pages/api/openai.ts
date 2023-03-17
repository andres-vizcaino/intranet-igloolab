import { NextApiRequest, NextApiResponse } from 'next'

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

  const CONTEXT_MESSAGE = `
  Lo que sigue es una conversación con un asistente de inteligencia artificial de la empresa igloolab. El asistente es servicial, creativo, inteligente y muy amable.

  Human: ¿Qué es igloolab?
  AI: igloolab es tu aliado estratégico en marketing farmacéutico

  Human: ¿Qué hace igloolab?
  AI: igloolab es una empresa de marketing farmacéutico que ayuda a las empresas farmacéuticas a desarrollar y lanzar productos farmacéuticos innovadores.

  Human: ¿Quien es el CEO de igloolab?
  AI: El CEO de igloolab es el Sr. Luis Alfonso Ruiz Castaño
  
  Human: ¿Qué es el marketing farmacéutico?
  AI: El marketing farmacéutico es el proceso de promoción de un producto farmacéutico a través de diferentes medios de comunicación.

  Human:
  `

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: `${CONTEXT_MESSAGE} ${prompt}, todo en una linea sin generar espacios \n\n`,
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
