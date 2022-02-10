import { Board } from '@prisma/client'
import CreateBoard from 'components/CreateBoard'
import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { deleteBoard } from 'services/todo.services'
import useSWR from 'swr'
import Image from 'next/image'

const BoardsPage: NextPage = () => {
  const { data, error, mutate } = useSWR<Board[]>('/api/todo')
  const [isOpen, setIsOpen] = useState(false)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const closeModal = () => setIsOpen(!isOpen)

  const deleteOneBoard = async (id: string) => {
    await deleteBoard(id)
    mutate(data.filter((board) => board.id !== id))
  }

  return (
    <>
      <div className="text-center">
        <h2 className="text-center text-4xl mt-5">Estos son tus tableros 👝</h2>
        <button
          type="button"
          onClick={closeModal}
          className="mt-4 max-w-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Agregar un nuevo tablero... ✏️
        </button>
      </div>
      <div className="mt-5 flex gap-10 flex-row flex-wrap">
        {data?.map((board) => (
          <div
            key={board.id}
            className="p-5 bg-slate-300 dark:bg-slate-600 rounded-md max-w-sm"
          >
            <h1 className="text-3xl mb-10">{board.name}</h1>
            <div className="flex justify-between">
              <Link href={`/boards/${board.id}`}>
                <a className="p-2 bg-slate-700 text-white">ir a este tablero</a>
              </Link>
              <Image
                onClick={() => deleteOneBoard(board.id)}
                className="cursor-pointer"
                src="/icons/trash.svg"
                width={25}
                height={25}
                alt="delete"
                draggable="false"
              />
            </div>
          </div>
        ))}
      </div>

      <CreateBoard isOpen={isOpen} closeModal={closeModal} />
    </>
  )
}

export default BoardsPage
