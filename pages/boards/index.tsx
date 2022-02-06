import { Board } from '@prisma/client'
import { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'

const BoardsPage: NextPage = () => {
  const { data, error } = useSWR<Board[]>('/api/todo')

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      {data?.map((board) => (
        <div key={board.id} className="p-5 bg-slate-300 rounded-md max-w-sm">
          <h1 className="text-5xl mb-10">{board.name}</h1>
          <Link href={`/boards/${board.id}`}>
            <a className="p-2 bg-slate-700 text-white">ir a este tablero</a>
          </Link>
        </div>
      ))}
    </>
  )
}

export default BoardsPage
