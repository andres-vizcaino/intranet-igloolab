import { ITweet } from 'models/Tweet.model'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { deleteTweet, updateLike } from 'services/tweet.services'
import { useSWRConfig } from 'swr'
import { getTimeAgo } from 'utils/getTimeAgo'
import { useState } from 'react'

const Tweet = ({ author, userId, body, createdAt, id, like }: ITweet) => {
  const { data: session } = useSession()
  const [likes, setLikes] = useState<number>(like || 0)
  const { mutate } = useSWRConfig()

  const handleClickDelete = async () => {
    await deleteTweet(id)
    mutate('/api/tweet')
  }

  const handleLike = async () => {
    setLikes(likes + 1)
    await updateLike(id, likes)
    mutate('/api/tweet')
  }

  return (
    <div
      className="w-full max-w-xl border dark:bg-gray-700 border-gray-300 rounded-2xl py-3 px-5"
      style={{ minWidth: 300 }}
    >
      <div className="flex  justify-between">
        <Link href={`/profile/${userId}`}>
          <a className="flex cursor-pointer">
            <Image
              src={author.image || ''}
              width={42}
              height={42}
              alt={`Foto de perfil de ${author.name}`}
              className="rounded-full"
            />

            <div className="ml-4">
              <p className="text-base">{author.name}</p>
              <p className="text-xs">{getTimeAgo(createdAt)}</p>
            </div>
          </a>
        </Link>
        {session?.user?.id === userId && (
          <Image
            onClick={handleClickDelete}
            className="cursor-pointer"
            src="/icons/trash.svg"
            width={25}
            height={25}
            alt="delete"
          />
        )}
      </div>
      <p className="mt-5 break-normal">{body}</p>
      <div className="mt-4">
        <button
          onClick={handleLike}
          className="mt-4 max-w-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {likes} 👍
        </button>
      </div>
    </div>
  )
}

export default Tweet
