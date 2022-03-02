import CardCongrats from 'components/CardCongrats'
import CreateCongrats from 'components/CreateCongrats'
import { ICongrat } from 'models/Congrat.model'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import useSWR from 'swr'

const CongrastPage = () => {
  const { data, error } = useSWR<ICongrat[]>('/api/congrat')
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()

  const closeModal = () => setIsOpen(!isOpen)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div className="text-center mt-5">
      {status === 'unauthenticated' || session == null ? (
        <p className="text-center text-4xl">No estás conectado. 🥲</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold md:text-4xl">
            😳 Muro de mensajes bonitos ⭐️
          </h1>
          <button
            onClick={closeModal}
            className="bg-blue-500 hover:bg-blue-700 text-white mt-5 font-bold py-2 px-4 rounded"
          >
            Crear una tarjeta
          </button>

          <div className="mt-5">
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
              {data.map((congrat) => (
                <CardCongrats key={congrat.id} {...congrat} />
              ))}
            </div>
          </div>

          <CreateCongrats isOpen={isOpen} closeModal={closeModal} />
        </>
      )}
    </div>
  )
}

export default CongrastPage
