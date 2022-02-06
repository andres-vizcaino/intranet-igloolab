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
    <div className="bg-slate-400">
      <TodoApp columnsBoard={board?.columns || []} />
    </div>
  )
}

export default BoardPage
