import { Transition, Dialog, Switch } from '@headlessui/react'
import { IUser } from 'models/User.model'
import { useSession } from 'next-auth/react'
import { useState, useEffect, ChangeEvent, FormEvent, Fragment } from 'react'
import { createCongrat } from 'services/congrat.services'
import useSWR, { mutate } from 'swr'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const options = [
  {
    label: 'Muchas gracias',
    value: 'THANKS',
  },
  {
    label: 'Que Crack',
    value: 'CRACK',
  },
  {
    label: 'Buen trabajo',
    value: 'GOOD_JOB',
  },
  {
    label: 'SIUUUUU',
    value: 'SIUU',
  },
]

const CreateCongrats = ({ isOpen, closeModal }: Props) => {
  const [status, setStatus] = useState('')
  const [count, setCount] = useState(0)
  const [selectUser, setSelectUser] = useState<IUser>()
  const [selectOption, setSelectOption] = useState('')
  const [isAnonymous, setisAnonymous] = useState(false)
  const { data } = useSWR<IUser[]>('/api/users')
  const { data: session } = useSession()

  useEffect(() => {
    setCount(status.length)
  }, [status])

  const handleOnChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) =>
    setStatus(target.value)

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await createCongrat(
      status,
      selectOption,
      session?.user.id || '',
      selectUser?.id || '',
      isAnonymous
    )
    setSelectOption('')
    setStatus('')
    setisAnonymous(false)
    setSelectUser(undefined)

    mutate('/api/congrat')
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
                Creando una tarjeta de felicitación 🎉...
              </Dialog.Title>

              <div className="mt-2">
                <label htmlFor="select-typemessage">Elije el motivo:</label>
                <select
                  id="select-typemessage"
                  value={selectOption}
                  onChange={(e) => setSelectOption(e.target.value)}
                  className="block w-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
                >
                  <option value="">Selecciona una opción</option>
                  {options.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-2">
                <label htmlFor="select-user">A quien va dirigido:</label>
                <select
                  id="select-user"
                  value={selectUser?.id}
                  onChange={(e) =>
                    setSelectUser(
                      data?.find((user) => user.id === e.target.value)
                    )
                  }
                  className="block w-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
                >
                  <option value="">Selecciona una opción</option>
                  {data
                    ?.filter((user) => user.id !== session?.user.id)
                    .map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mt-2">
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-800"
                  placeholder="Escribe aqui tu mensajito..."
                  maxLength={450}
                  autoFocus
                  value={status}
                  onChange={handleOnChange}
                  style={{ height: 220 }}
                />

                <div className="mt-2 text-right">
                  <span
                    className={`${
                      count >= 400
                        ? 'text-red-500'
                        : 'text-gray-600 dark:text-white'
                    } text-sm `}
                  >
                    {count}/450
                  </span>
                </div>
              </div>

              <Switch.Group>
                <div className="flex items-center mt-4">
                  <Switch.Label className="mr-4">
                    Publicar como anónimo?
                  </Switch.Label>
                  <Switch
                    checked={isAnonymous}
                    onChange={setisAnonymous}
                    className={`${
                      isAnonymous ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    <span
                      className={`${
                        isAnonymous ? 'translate-x-6' : 'translate-x-1'
                      } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    />
                  </Switch>
                </div>
              </Switch.Group>

              <div className="mt-4">
                <button
                  disabled={!selectUser || !selectOption || !status}
                  type="submit"
                  className="disabled:bg-slate-300 mt-4 max-w-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

export default CreateCongrats
