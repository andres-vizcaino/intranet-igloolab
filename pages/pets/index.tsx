import CreatePetModal from 'components/CreatePet'
import { useState } from 'react'
import useSWR from 'swr'
import { IPet } from 'models/Pet.model'
import Image from 'next/image'
import { getUrlCloudnaryLowQuality } from 'utils/getUrlCloudnaryLowQuality'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { deletePet } from 'services/pet.services'
import { NextApplicationPage } from 'pages/_app'
import LigthBoxImagePet from 'components/LigthBoxImagePet'

const PetsPage: NextApplicationPage = () => {
  const { data: session } = useSession()
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
              className={`scale-75 ${
                index % 2 === 0
                  ? 'translate-x-4 skew-y-3'
                  : 'translate-x-4 -skew-y-3'
              }  transform-gpu hover:scale-110 ease-in-out transition-all`}
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
              {session?.user.id === pet.owner.id && (
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

      <LigthBoxImagePet
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
