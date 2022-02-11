
import useBoard from 'hooks/useBoard'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import prisma from 'lib/prisma'
import { useEffect } from 'react'
import TodoApp from 'components/todo/TodoApp'

type Props = {
  isErrorServer: true
}

const BoardPage: NextPage<Props> = ({ isErrorServer }: Props) => {
  const router = useRouter()

  const { id } = router.query

  const { board, isError, isLoading, mutate } = useBoard(id as string)

  useEffect(() => {
    mutate()
  }, [mutate])

  if (isErrorServer) {
    return (
      <div className=" mt-10 text-center flex flex-col gap-5 items-center">
        <p className="text-4xl"> No tienes acceso a este tablero 🥺</p>
        <button
          className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => router.push('/boards')}
        >
          Ir a tus tableros 👝
        </button>
      </div>
    )
  }

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

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { id } = query
  const session = await getSession({ req })

  const board = await prisma.board.findUnique({
    where: {
      id: id as string,
    },
    select: {
      authorId: true,
    },
  })

  if (board?.authorId !== session?.user.id) {
    return {
      props: {
        isErrorServer: true,
      },
    }
  }

  return {
    props: {},
  }
}

export default BoardPage
