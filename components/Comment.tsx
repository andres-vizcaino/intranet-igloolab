import Link from 'next/link'
import { getTimeAgo } from 'utils/getTimeAgo'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { deleteComemnt } from 'services/tweet.services'
import { mutate } from 'swr'

type Props = {
  photo: string
  nameUser: string
  createdAt: number
  body: string
  id: number
  authorId: string
  tweetIdUser: string
  tweetId: number
}

const Comment = ({
  photo,
  nameUser,
  tweetIdUser,
  body,
  createdAt,
  id,
  authorId,
  tweetId,
}: Props) => {
  const { data: session } = useSession()

  const handleClickDelete = async () => {
    await deleteComemnt(id)
    mutate(`/api/tweet/${tweetId}`)
  }

  return (
    <div
      className="w-full max-w-xl border dark:bg-gray-700 border-gray-300 rounded-2xl py-3 px-5"
      style={{ minWidth: 300 }}
    >
      <div className="flex justify-between">
        <Link href={`/profile/${authorId}`}>
          <a className="flex cursor-pointer">
            <Image
              src={photo || ''}
              width={42}
              height={42}
              alt={`Foto de perfil de ${nameUser}`}
              className="rounded-full"
            />

            <div className="ml-4">
              <p className="text-base">{nameUser}</p>
              <p className="text-xs">{getTimeAgo(createdAt)}</p>
            </div>
          </a>
        </Link>

        {(session?.user?.id === tweetIdUser ||
          session?.user.id === authorId) && (
          <Image
            onClick={handleClickDelete}
            className="cursor-pointer"
            src="/icons/trash.svg"
            width={25}
            height={25}
            alt="delete"
            draggable="false"
          />
        )}
      </div>
      <p className="mt-5 break-words mb-5"> {body}</p>
    </div>
  )
}

export default Comment
