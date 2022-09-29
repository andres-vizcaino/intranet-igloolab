import Tweet from 'components/Tweet'
import { ITweet } from 'models/Tweet.model'
import useSWR from 'swr'
import Chip from 'components/Chip'
import { IUser } from 'models/User.model'
import {
  diffDaysToNow,
  getDateToStringWithCurrentYear,
} from 'utils/getDayandMonth'
import { allConfetti } from 'utils/fireworks-conffeti'
import CreateTweet from 'components/CreateTweet'
import { NextApplicationPage } from './_app'
import { useState } from 'react'

const Home: NextApplicationPage = () => {
  const { data, error } = useSWR<ITweet[]>('/api/tweet')
  const { data: users } = useSWR<IUser[]>('/api/users')
  const [onlyCorazon, setOnlyCorazon] = useState(false)

  return (
    <div>

      <div className="mt-10 flex flex-col gap-7 justify-center items-center">
        <CreateTweet />
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

        <button
          type="button"
          onClick={() => setOnlyCorazon(!onlyCorazon)}
          className="max-w-lg bg-igloolab hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {onlyCorazon ? 'Ver todos los estados' : 'Ver solo #diadelcorazon'}
        </button>

        {error && <div>failed to load</div>}
        {!data && <div>Cargando todos los tweets...</div>}
        {data?.filter(tweet => onlyCorazon ? tweet.body.includes('#diadelcorazon') : true).map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </div>
    </div>
  )
}

Home.requireAuth = true

export default Home
