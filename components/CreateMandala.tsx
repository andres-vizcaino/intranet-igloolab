import { Transition, Dialog } from '@headlessui/react'
import useFileUpload from 'hooks/utils/useFileUpload'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { FormEvent, Fragment, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { postNewMandala } from 'services/mandala.services'
import { uploadFileReturnName } from 'services/uploadFile.services'
import { mutate } from 'swr'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const CreateMandalaModal = ({ isOpen, closeModal }: Props) => {
  const { data: session } = useSession()
  const [name, setName] = useState('')
  const { image, preview, setImage } = useFileUpload()
  const [isLoading, setIsLoading] = useState(false)

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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    if (image) {
      const photo: string = await uploadFileReturnName(image)
      await postNewMandala(name, photo, session?.user?.id || '')
    }
    setIsLoading(false)

    mutate('/api/mandala')

    closeModal()
    setName('')
    setImage(undefined)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          closeModal()
          setImage(undefined)
        }}
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
            {isLoading ? (
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-slate-500 shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Estamos cargando la fotico de tu mandala 👀📸, por favor
                  espera...
                </Dialog.Title>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-slate-500 shadow-xl rounded-2xl"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Sube la foto de tu mandala 📸
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-800"
                    placeholder="Cuál es su nombre?"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
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
                    La imagen selecionada es muy pesada, intenta con una menor a
                    2MB
                  </div>
                )}

                <div className="mt-5 flex space-x-5 border-t border-gray-300">
                  <button
                    type="submit"
                    disabled={!name || !image}
                    className="mt-4 max-w-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-slate-300 disabled:text-white"
                  >
                    Publicar 👍
                  </button>
                </div>
              </form>
            )}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CreateMandalaModal
