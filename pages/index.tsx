import CreateTweet from 'components/CreateTweet'
import Tweet from 'components/Tweet'
import { ITweet } from 'models/Tweet.model'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import useSWR from 'swr'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const { data, error } = useSWR<ITweet[]>('/api/tweet')

  return (
    <div>
      {status === 'unauthenticated' || session == null ? (
        <p className="text-center text-4xl">No estás conectado. 🥲</p>
      ) : (
        <>
          <div className="flex justify-center gap-1 sm:gap-10 flex-col sm:flex-row items-center">
            <CreateTweet />
            <Link href={'/profile'}>
              <a
                type="button"
                className="mt-4 max-w-lg bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Ver directorio 👀
              </a>
            </Link>
          </div>
          <div className="mt-10 flex flex-col gap-7 justify-center items-center">
            <div className="text-red-500 font-medium">
              Chismosea los ultimos estados
            </div>
            {error && <div>failed to load</div>}
            {!data && <div>Cargando todos los tweets...</div>}
            {data?.map((tweet) => (
              <Tweet key={tweet.id} {...tweet} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Home
