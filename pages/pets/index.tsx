import CreatePetModal from 'components/CreatePet'
import { NextPage } from 'next'
import { useState } from 'react'
import useSWR from 'swr'
import { IPet } from 'models/Pet.model'
import Image from 'next/image'
import { getUrlCloudnaryLowQuality } from 'utils/getUrlCloudnaryLowQuality'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { deletePet } from 'services/pet.services'
import LigthBoxImage from 'components/LigthBoxImage'
import { NextApplicationPage } from 'pages/_app'

const PetsPage: NextApplicationPage = () => {
  const { data: session, status } = useSession()
  const handleClick = () => signIn('google')
  const [isOpen, setIsOpen] = useState(false)
  const [petSelected, setPetSelected] = useState<IPet>()
  const [isOpenLigthBox, setIsOpenLigthBox] = useState(false)
  const closeModal = () => setIsOpen(!isOpen)
  const closeLigthBox = () => setIsOpenLigthBox(!isOpenLigthBox)
  const { data: pets, error, mutate } = useSWR<IPet[]>('/api/pets')

  const deletePetSelect = async (id: string) => {
    await deletePet(id)
    mutate()
  }

  if (status === 'unauthenticated' || session == null)
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

  if (error) return <div>failed to load</div>
  if (!pets) return <div>loading...</div>

  return (
    <div className="text-center mt-5">
      <h1 className="text-2xl font-bold md:text-4xl">
        🐶🐱 Mascotas <span className="text-red-500">igloolab</span> 🐢🐠🐍
      </h1>
      <h3>Sube una foto de tu mascota 📸</h3>
      <button
        onClick={closeModal}
        className="bg-blue-500 hover:bg-blue-700 text-white mt-5 font-bold py-2 px-4 rounded"
      >
        Subir foto
      </button>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
        {pets.map((pet, index) => (
          <div
            key={pet.id}
            className={`${index === 0 && 'sm:row-span-2	sm:col-span-2'}`}
          >
            <Image
              src={getUrlCloudnaryLowQuality(pet.photo)}
              alt={pet.name}
              width="100%"
              onClick={() => {
                setPetSelected(pet)
                closeLigthBox()
              }}
              height="100%"
              layout="responsive"
              className={`scale-75 ${index % 2 === 0
                  ? 'translate-x-4 skew-y-3'
                  : 'translate-x-4 -skew-y-3'
                }  transform-gpu hover:scale-110`}
              objectFit="cover"
              unoptimized
              loading="lazy"
            />
            <div className="flex gap-1 justify-center items-baseline">
              <p
                className={`${index === 0 ? 'text-3xl' : 'text-xl'} font-bold`}
              >
                {pet.name}
              </p>
              {session.user.id === pet.owner.id && (
                <button onClick={() => deletePetSelect(pet.id)}>❌</button>
              )}
            </div>

            <div className="flex items-center justify-center gap-1">
              <Image
                src={pet.owner.image}
                alt={pet.owner.name || ''}
                width={20}
                height={20}
                className="rounded-full"
              />
              <Link href={`/profile/${pet.owner.id}`}>
                <a className={`${index === 0 ? 'text-base' : 'text-sm'}`}>
                  {pet.owner.name}
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <LigthBoxImage
        isOpen={isOpenLigthBox}
        closeModal={closeLigthBox}
        image={petSelected?.photo || ''}
        owner={petSelected?.owner}
        name={petSelected?.name || ''}
        likesBy={petSelected?.likesBy || []}
        idPet={petSelected?.id || ''}
      />
      <CreatePetModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  )
}

PetsPage.requireAuth = true

export default PetsPage
