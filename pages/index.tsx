import Tweet from 'components/Tweet'
import { ITweet } from 'models/Tweet.model'
import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import useSWR from 'swr'
import Chip from 'components/Chip'
import { IUser } from 'models/User.model'
import {
  diffDaysToNow,
  getDateToStringWithCurrentYear,
} from 'utils/getDayandMonth'
import { allConfetti } from 'utils/fireworks-conffeti'
import CreateTweet from 'components/CreateTweet'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const handleClick = () => signIn('google')
  const { data, error } = useSWR<ITweet[]>('/api/tweet')
  const { data: users } = useSWR<IUser[]>('/api/users')

  return (
    <div>
      {status === 'unauthenticated' || session == null ? (
        <div>
          <p className="text-center text-4xl">No estás conectado. 🥲</p>
          <button
            onClick={handleClick}
            className={
              'flex items-center justify-center w-full px-4 py-2 space-x-1 font-medium tracking-wider uppercase bg-gray-100 border rounded-md focus:outline-none focus:ring'
            }
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                x="0"
                y="0"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                ></path>
              </svg>
            </span>
            <span> Ingresar </span>
          </button>
        </div>
      ) : (
        <>
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
