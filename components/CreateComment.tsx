import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { createComment } from 'services/tweet.services'
import { mutate } from 'swr'

type Props = {
  tweetId: string
}

const CreateComment = ({ tweetId }: Props) => {
  const { data: session } = useSession()

  const [comment, setComment] = useState('')

  const newComment = async () => {
    if (comment) {
      await createComment(comment, session?.user.id || '', tweetId)
      setComment('')
      mutate(`/api/tweet/${tweetId}`)
    }
  }

  return (
    <div className="max-w-xl w-full flex justify-between gap-3 flex-col sm:flex-row">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-800"
        type="text"
        placeholder="Escribe un comentario..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button
        disabled={comment === ''}
        onClick={newComment}
        className="disabled:bg-slate-300 dark:disabled:bg-gray-300 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Comentar
      </button>
    </div>
  )
}

export default CreateComment
