import Tweet from 'components/Tweet'
import useTweet from 'hooks/useTweet'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Comment from 'components/Comment'
import CreateComment from 'components/CreateComment'
import { IComment } from 'models/Comment.model'

const TweetId = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [tweetId, setTweetId] = useState('')
  const [comments, setComments] = useState<IComment[]>([])
  const { id } = router.query
  const { tweet, isError, isLoading } = useTweet(tweetId)

  useEffect(() => {
    setTweetId((id as string) || '')
    setComments(tweet?.Comment || [])
  }, [id, tweet])

  if (!id) return null // SI NO SE COLOCA, EL DOM NO SE HIDRATA Y CARGA EL COMPONENTE SIN ESTE ID...

  if (status === 'unauthenticated' || session == null)
    <p className="text-center text-4xl">No estás conectado. 🥲</p>

  if (isError) return <p>Error</p>
  if (isLoading) return <p>Loading</p>

  return (
    <div className="mt-10 flex flex-col gap-7 justify-center items-center">
      {tweet && !Array.isArray(tweet) && <Tweet {...tweet} />}

      <CreateComment tweetId={tweetId} />

      <div className="max-w-xl w-full flex justify-between gap-3 flex-col">
        {comments.length > 0 ? (
          comments.map(({ author, body, createdAt, id }) => (
            <Comment
              key={id}
              authorId={author.id}
              body={body}
              createdAt={createdAt}
              id={id}
              nameUser={author.name || ''}
              photo={author.image}
              tweetIdUser={tweet?.author.id || ''}
              tweetId={tweet?.id || 0}
            />
          ))
        ) : (
          <p className="text-center text-2xl">No hay comentarios 😿</p>
        )}
      </div>
    </div>
  )
}

export default TweetId
