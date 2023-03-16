import { useState } from 'react'
import { getResponseAI } from 'services/ai.services'
import { NextApplicationPage } from './_app'

const AIPage: NextApplicationPage = () => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [prompt, setPrompt] = useState('')

  const handleSendPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResponse(null)

    if (!prompt) {
      return
    }

    setLoading(true)

    getResponseAI({ prompt: prompt as string })
      .then((response) => {
        setResponse(response)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSendFeedback = ({ helpful }: { helpful: boolean }) => {
    if (!response) {
      return
    }

    if (!prompt) {
      return
    }

    fetch('/api/save-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        prompt,
        response,
        helpful,
      }),
    })
      .then(() => {
        setResponse(null)
        setPrompt('')
      })

      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="container max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center">
        Bienvenido al igloo-ai, un asistente virtual en tu intranet para
        ayudarte en tu día a día en igloolab.
      </h2>
      <p className="text-center mt-5">
        En este momento estamos trabajando en el desarrollo de este asistente,
        pero puedes ayudarnos a mejorarlo. Utiliza el campo de texto para dejar
        un requerimiento o pregunta y la igloo-ai te generará una respuesta...
        Todas tus preguntas y respuestas serán guardadas de forma anónima para
        que podamos mejorar el asistente. De este modo nuestro igloo-ai podrá
        aprender directamente de nosotros colaboradores de igloolab y de esta
        forma conseguir que conozca mejor nuestras necesidades y nos ayude a
        resolverlas.
      </p>

      <div className="border p-6 mt-10 border-dashed">
        <div>
          <h3 className="text-xl font-bold text-center">
            ¿En que te puedo ayudar?
          </h3>
          <form onSubmit={handleSendPrompt} className="mt-5">
            <textarea
              className="w-full h-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Escribe aquí tu requerimiento o pregunta"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>

            <div className="mt-5 flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>

        {loading && (
          <div className="mt-10">
            Generando una respuesta... Por favor espera...
          </div>
        )}

        {response && (
          <div className="mt-10">
            <h3 className="text-xl font-bold text-center">Respuesta</h3>
            <div className="mt-5">
              <p className="text-center">{response}</p>
            </div>

            <div className="mt-5 flex flex-col justify-center gap-3">
              <h4 className="text-xs">¿Te pareció útil la respuesta?</h4>
              <div className="flex gap-5">
                <button
                  onClick={() => handleSendFeedback({ helpful: true })}
                  className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
                >
                  Si
                </button>
                <button
                  onClick={() => handleSendFeedback({ helpful: false })}
                  className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

AIPage.requireAuth = true

export default AIPage
