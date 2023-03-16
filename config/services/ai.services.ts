const API = '/api/openai'

type getResponseAIType = {
  prompt: string
}

export const getResponseAI = async ({ prompt }: getResponseAIType) => {
  const response = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
    }),
  })

  const { text } = await response.json()

  return text
}
