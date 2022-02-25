import CreateTweet from 'components/CreateTweet'
import Tweet from 'components/Tweet'
import { ITweet } from 'models/Tweet.model'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import useSWR from 'swr'
import Chip from 'components/Chip'
import { IUser } from 'models/User.model'
import {
  diffDaysToNow,
  getDateToStringWithCurrentYear,
} from 'utils/getDayandMonth'
import { allConfetti } from 'utils/fireworks-conffeti'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const { data, error } = useSWR<ITweet[]>('/api/tweet')
  const { data: users } = useSWR<IUser[]>('/api/users')

  return (
    <div>
      {status === 'unauthenticated' || session == null ? (
        <p className="text-center text-4xl">No estás conectado. 🥲</p>
      ) : (
        <>
          <div className="mt-10 flex flex-col gap-7 justify-center items-center">
            <div className="text-red-500 font-medium">
              Chismosea los ultimos estados
            </div>
            <div className="flex">
              {users?.map((user) => {
                const daysLeft = diffDaysToNow(
                  getDateToStringWithCurrentYear(user.profile?.birthday || '')
                )

                if (daysLeft == 0) allConfetti()

                if (daysLeft <= 10 && daysLeft >= 0)
                  return (
                    <Chip
                      key={user.id}
                      name={user.name || ''}
                      date={daysLeft}
                      photo={user.image}
                    />
                  )
              })}
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
