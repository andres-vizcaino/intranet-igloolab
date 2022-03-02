/* eslint-disable @next/next/no-img-element */
import { TypeMessage } from 'config/constants/TypeMessage.enum'
import { ICongrat } from 'models/Congrat.model'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { deleteCongrat } from 'services/congrat.services'
import { mutate } from 'swr'
import { getTimeAgo } from 'utils/getTimeAgo'

type tplotOptions = {
  [key: string]: string
}
const colorsBg: tplotOptions = {
  THANKS: 'verde.jpeg',
  CRACK: 'rojo.jpeg',
  GOOD_JOB: 'amarillo.jpg',
  SIUU: 'cr7.png',
}

const CardCongrats = (Congrat: ICongrat) => {
  const type = Congrat.typeCongrat
  const { data: session } = useSession()

  const deleteCard = async () => {
    await deleteCongrat(Congrat.id)
    mutate('/api/congrat')
  }

  return (
    <div className="w-full flex flex-col bg-white border border-gray-100 rounded-lg text-center hover:shadow-lg shadow-md align-center">
      <div className={'flex-grow'}>
        <a>
          <img
            src={`/img/${colorsBg[type]}`}
            alt={Congrat.typeCongrat}
            className="rounded-t-lg max-h-20 w-full h-full object-cover"
          />
        </a>
        <a>
          <div className="flex justify-center">
            <Link href={`/profile/${Congrat.from.id}`}>
              <a>
                <img
                  src={Congrat.from.image}
                  alt={Congrat.from.name || ''}
                  width={60}
                  height={60}
                  className="rounded-full object-center border-4 border-white -mt-6 shadow-lg align-center"
                />
              </a>
            </Link>
          </div>
          <p className="font-bold pt-3 pb-2 text-black">
            {`${TypeMessage[type as unknown as keyof typeof TypeMessage]} ${
              Congrat.from.name
            }`}
          </p>
        </a>
        <p className="font-semibold p-2 text-sm text-gray-500">
          <a> Por: </a>
          {Congrat.isAnonymous ? (
            <a> Anónimo </a>
          ) : (
            <Link href={`/profile/${Congrat.author.id}`}>
              <a className="text-blue-500 hover:text-blue-700">
                {Congrat.author.name}
              </a>
            </Link>
          )}
        </p>
        <p className="px-10 py-2 mb-5 text-gray-500">{Congrat.message}</p>
      </div>

      <p className="py-2 text-sm text-gray-600 flex gap-2 justify-center">
        <span>⌚️ {getTimeAgo(Congrat.createdAt)}</span>
        {session?.user.id === Congrat.author.id && (
          <button onClick={deleteCard}>❌</button>
        )}
      </p>
    </div>
  )
}

export default CardCongrats
