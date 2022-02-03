import { Dialog, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react'
import { createTweet } from 'services/tweet.services'
import { useSWRConfig } from 'swr'

const CreateTweet = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [count, setCount] = useState(0)
  const { data: session } = useSession()
  const { mutate } = useSWRConfig()

  useEffect(() => {
    setCount(status.length)
  }, [status])

  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  const handleOnChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) =>
    setStatus(target.value)

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await createTweet(status, session?.user.id || '')
    mutate('/api/tweet')
    setStatus('')
    setIsOpen(false)
  }

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="mt-4 max-w-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Crea un estado ✏️
        </button>
      </div>

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
                onSubmit={handleOnSubmit}
                className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-slate-500 shadow-xl rounded-2xl"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Cuentanos todo 👀
                </Dialog.Title>
                <div className="mt-2">
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-800"
                    placeholder="Escribe aqui tu estado"
                    maxLength={280}
                    autoFocus
                    value={status}
                    onChange={handleOnChange}
                    style={{ height: 220 }}
                  />

                  <div className="mt-2 text-right">
                    <span
                      className={`${
                        count >= 200
                          ? 'text-red-500'
                          : 'text-gray-600 dark:text-white'
                      } text-sm `}
                    >
                      {count}/280
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="mt-4 max-w-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Crear 👍
                  </button>
                </div>

                <div className="mt-5 flex space-x-5 border-t border-gray-300">
                  <span className="mt-3 text-xs">
                    ¿Deseas agregar un Link? dejalo de ultimo en tu tweet
                    {' 🚀 '}
                  </span>
                </div>
              </form>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default CreateTweet
