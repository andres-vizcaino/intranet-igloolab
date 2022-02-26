/* eslint-disable @next/next/no-img-element */
import { Transition, Dialog } from '@headlessui/react'
import { IUser } from 'models/User.model'
import { Fragment, useEffect, useState } from 'react'
import { getUrlCloudnaryLowQuality } from 'utils/getUrlCloudnaryLowQuality'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { likePet, unlikePet } from 'services/pet.services'

type Props = {
  idPet: string
  image: string
  name: string
  owner: IUser | undefined
  isOpen: boolean
  likesBy: IUser[]
  closeModal: () => void
}

const LigthBoxImage = ({
  image,
  name,
  owner,
  isOpen,
  likesBy,
  idPet,
  closeModal,
}: Props) => {
  const { data: session } = useSession()
  const [urlImage, setUrlImage] = useState('')
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    setUrlImage(getUrlCloudnaryLowQuality(image))
    setLikes(likesBy.length)
    setIsLiked(likesBy.some((user) => user.id === session?.user?.id))
  }, [image, likesBy, session])

  const handleClickLike = async () => {
    setIsLiked(!isLiked)
    if (!isLiked) {
      setLikes(likes + 1)
      await likePet(idPet, session?.user?.id)
    } else {
      setLikes(likes - 1)
      await unlikePet(idPet, session?.user?.id)
    }
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
                {likes > 0 && (
                  <div className="flex justify-center text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                    </svg>
                    <span> {likes} igloo-Likes</span>
                  </div>
                )}
                <img src={urlImage} alt={name} className="rounded-lg" />

                <div className="flex justify-center">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex gap-2"
                    onClick={handleClickLike}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                    </svg>
                    {isLiked ? 'Ya no me gusta' : 'Me encanta'}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default LigthBoxImage
