import { Dialog, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react'
import { createTweet } from 'services/tweet.services'
import { useSWRConfig } from 'swr'
import Image from 'next/image'
import useFileUpload from 'hooks/utils/useFileUpload'
import { useDropzone } from 'react-dropzone'
import { uploadFileReturnName } from 'services/uploadFile.services'
import { createNotification } from 'services/createNotification'

const CreateTweet = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [count, setCount] = useState(0)
  const { data: session } = useSession()
  const { mutate } = useSWRConfig()
  const { image, preview, setImage } = useFileUpload()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setCount(status.length)
  }, [status])

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    },
    maxSize: 2500000, // 2.5MB
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles?.[0]
      if (file) {
        setImage(file)
      } else {
        setImage(undefined)
      }
    },
  })

  const closeModal = () => setIsOpen(false)
  const openModal = () => {
    router.push('/')
    setIsOpen(true)
  }

  const handleOnChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) =>
    setStatus(target.value)

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    let photo = ''
    if (image) {
      photo = await uploadFileReturnName(image)
    }
    await createTweet({
      body: status,
      userId: session?.user.id || '',
      image: photo,
    }).then(async () => {
      const notificationMessage = `${session?.user.name} ha creado un estado en la intranet, ve a verlo! 🙈🙉
      
      https://open.igloolab.co/}
      `

      await createNotification({
        text: notificationMessage,
      })
    })

    setIsLoading(false)
    mutate('/api/tweet')
    setStatus('')
    setIsOpen(false)
    setImage(undefined)
  }

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="max-w-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
              {isLoading ? (
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-slate-500 shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Estamos cargando tu tweet 👀📸, por favor espera...
                  </Dialog.Title>
                </div>
              ) : (
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

                  {preview ? (
                    <div className="mt-2 text-center flex flex-col gap-1">
                      <Image
                        src={preview}
                        alt="preview"
                        layout="responsive"
                        width={'100%'}
                        height={'100%'}
                        objectFit="contain"
                      />

                      <a
                        onClick={() => setImage(undefined)}
                        className="text-xs mt-2 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                      >
                        Cambiar foto 📸
                      </a>
                    </div>
                  ) : (
                    <section className="border-dotted border-4 mt-2 text-center">
                      <div {...getRootProps()} className="px-16 py-5">
                        <input {...getInputProps()} accept="image/*" />
                        <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Seleccionar foto
                        </a>
                        <p className="mt-1">o sueltala aquí</p>
                        <p className="text-xs">
                          Solo se permite imagenes menores de 2MB
                        </p>
                      </div>
                    </section>
                  )}

                  {fileRejections.length > 0 && (
                    <div className="mt-2 text-center text-xs text-red-500">
                      La imagen selecionada es muy pesada, intenta con una menor
                      a 2MB
                    </div>
                  )}

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
              )}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default CreateTweet
