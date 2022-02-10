import TodoApp from 'components/todo/TodoApp'
import useBoard from 'hooks/useBoard'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const BoardPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { board, isError, isLoading } = useBoard(id as string)

  if (isError) return <p>Error</p>
  if (isLoading) return <p>Loading</p>
  return (
    <div>
      <div className="text-center my-10">
        <h2 className="text-4xl font-bold">{board?.name}</h2>
        <p>{board?.description}</p>
        <p>🗓 {new Date(board?.createdAt || '').toLocaleDateString()}</p>
      </div>
      <TodoApp columnsBoard={board?.columns || []} boardId={board?.id} />
    </div>
  )
}

export default BoardPage
