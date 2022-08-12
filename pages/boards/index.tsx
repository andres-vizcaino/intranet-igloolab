import { Board } from '@prisma/client'
import CreateBoard from 'components/CreateBoard'
import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { deleteBoard } from 'services/todo.services'
import useSWR from 'swr'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { NextApplicationPage } from 'pages/_app'

const BoardsPage: NextApplicationPage = () => {
  const { data: session, status } = useSession()
  const handleClick = () => signIn('google')
  const { data, error, mutate } = useSWR<Board[]>(
    `/api/todo/board/${session?.user.id}`
  )

  const [isOpen, setIsOpen] = useState(false)

  if (status === 'unauthenticated' || session == null) {
    return (
      <div>
        <p className="text-center text-4xl">No estás conectado. 🥲</p>
        <button
          onClick={handleClick}
          className={
            'flex items-center justify-center w-full px-4 py-2 space-x-1 font-medium tracking-wider uppercase bg-gray-100 border rounded-md focus:outline-none focus:ring'
          }
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              x="0"
              y="0"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
              ></path>
            </svg>
          </span>
          <span> Ingresar </span>
        </button>
      </div>
    )
  }

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

BoardsPage.requireAuth = true

export default BoardsPage
