import { ITweet } from 'models/Tweet.model'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { deleteTweet, likeTweet, unlikeTweet } from 'services/tweet.services'
import { useSWRConfig } from 'swr'
import { getTimeAgo } from 'utils/getTimeAgo'
import { getLinkFromText, linkify } from 'utils/linkify'
import { LinkPreview } from '@dhaiwat10/react-link-preview'
import { getMetadataFromUrl } from 'utils/getMetadataFromUrl'
import { getNamesFromArray } from 'utils/getNamesFromArray'

const Tweet = ({ author, userId, body, createdAt, id, likesBy }: ITweet) => {
    const { data: session } = useSession()
    const { mutate } = useSWRConfig()
    const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(0)
    const [nameLikes, setNameLikes] = useState('')

    useEffect(() => {
        if (likesBy) {
            if (likesBy) setLikes(likesBy.length)

            setIsLiked(likesBy.some((user) => user.id === session?.user?.id))
            setNameLikes(getNamesFromArray(likesBy, session?.user?.id))
        }
    }, [likesBy, session])

    const handleClickDelete = async () => {
        await deleteTweet(id)
        mutate('/api/tweet')
    }

    const handleClickLike = async () => {
        setIsLiked(!isLiked)
        if (!isLiked) {
            setLikes(likes + 1)
            await likeTweet(id, session?.user?.id)
        } else {
            setLikes(likes - 1)
            await unlikeTweet(id, session?.user?.id)
        }
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
                        draggable="false"
                    />
                )}
            </div>

            <p
                className="mt-5 break-words mb-5"
                dangerouslySetInnerHTML={{ __html: linkify(body) }}
            />

            {getLinkFromText(body) && (
                <LinkPreview
                    url={getLinkFromText(body)?.toString() || ''}
                    showLoader
                    openInNewTab
                    fallback={
                        session?.user?.id === userId ? (
                            <p className="text-xs text-red-500">
                                Lo sentimos, no encontramos una
                                pre-visualización para tu link 🥺
                            </p>
                        ) : null
                    }
                    descriptionLength={100}
                    fetcher={getMetadataFromUrl}
                />
            )}

            <div className="mt-5 flex justify-between space-x-5 sm:hover:text-pink-700 pt-3 text-gray-500 border-t border-gray-300">
                <div
                    className={`flex space-x-2 cursor-pointer ${
                        isLiked && 'text-pink-700'
                    }`}
                    onClick={handleClickLike}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                    </svg>
                    <span> {likes} igloo-Likes</span>
                </div>
                <div>
                    <span className="text-xs">{nameLikes}</span>
                </div>
            </div>
        </div>
    )
}

export default Tweet
