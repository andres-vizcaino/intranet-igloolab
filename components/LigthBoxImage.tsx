/* eslint-disable @next/next/no-img-element */
import { Transition, Dialog } from '@headlessui/react'
import { IUser } from 'models/User.model'
import { Fragment, useEffect, useState } from 'react'
import { getUrlCloudnaryLowQuality } from 'utils/getUrlCloudnaryLowQuality'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  image: string
  name: string
  owner: IUser | undefined
  isOpen: boolean
  closeModal: () => void
}

const LigthBoxImage = ({ image, name, owner, isOpen, closeModal }: Props) => {
  const [urlImage, setUrlImage] = useState('')

  useEffect(() => {
    setUrlImage(getUrlCloudnaryLowQuality(image))
  }, [image])

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
            <div className=" inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-slate-500 shadow-xl rounded-2xl">
              <div className="flex flex-col gap-3 justify-center text-center">
                <div className="flex items-center justify-center gap-1">
                  <Image
                    src={owner?.image || ''}
                    alt={owner?.name || ''}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <Link href={`/profile/${owner?.id}`}>
                    <a className="text-sm">{owner?.name}</a>
                  </Link>
                </div>
                <h5 className="font-semibold text-2xl">{name}</h5>
                <img src={urlImage} alt={name} className="rounded-lg" />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default LigthBoxImage
