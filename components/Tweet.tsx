import { ITweet } from 'models/Tweet.model'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { deleteTweet } from 'services/tweet.services'
import useSWR from 'swr'
import { getTimeAgo } from 'utils/getTimeAgo'

const Tweet = ({ author, userId, body, createdAt, id }: ITweet) => {
  const { data: session } = useSession()
  const { mutate } = useSWR('/api/tweet')

  const handleClickDelete = async () => {
    await deleteTweet(id)
    mutate()
  }

  return (
    <div
      className="w-full max-w-xl border border-gray-300 rounded-2xl py-3 px-5"
      style={{ minWidth: 300 }}
    >
      <div className="flex  justify-between">
        <div className="flex cursor-pointer">
          <Link href={`/profile/${userId}`} passHref>
            <>
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
            </>
          </Link>
        </div>
        {session?.user?.id === userId && (
          <Image
            onClick={handleClickDelete}
            src="/icons/trash.svg"
            width={25}
            height={25}
            alt="delete"
          />
        )}
      </div>

      <p className="mt-5 break-normal">{body}</p>
    </div>
  )
}

export default Tweet