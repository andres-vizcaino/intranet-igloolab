import { Transition, Dialog } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import { FormEvent, Fragment, useState } from 'react'
import { createBoard } from 'services/todo.services'
import { mutate } from 'swr'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const CreateBoard = ({ isOpen, closeModal }: Props) => {
  const { data: session } = useSession()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await createBoard(name, description, session?.user.id || '')
    mutate('/api/todo/board/' + session?.user.id)
    closeModal()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <form
              onSubmit={onSubmit}
              className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-slate-500 shadow-xl rounded-2xl"
            >
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
              >
                Un nuevo tablero? 📋
              </Dialog.Title>
              <div className="mt-2">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-800"
                  placeholder="Escribe el nombre del tablero"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mt-2">
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-800"
                  placeholder="Descipción del tablero"
                  maxLength={280}
                  autoFocus
                  style={{ height: 220 }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="mt-4 max-w-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Crear 👍
                </button>
              </div>
            </form>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CreateBoard
