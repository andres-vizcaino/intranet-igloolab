import LigthBoxImage from 'components/LigthBoxImage'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'
import { getUrlCloudnaryLowQuality } from 'utils/getUrlCloudnaryLowQuality'
import { NextApplicationPage } from './_app'
import Image from 'next/image'
import { deleteContent } from 'services/content.services'
import CreateContentModal from 'components/CreateContent'

const HalloweenPage: NextApplicationPage = () => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [petSelected, setPetSelected] = useState<any>()
  const [isOpenLigthBox, setIsOpenLigthBox] = useState(false)
  const closeModal = () => setIsOpen(!isOpen)
  const closeLigthBox = () => setIsOpenLigthBox(!isOpenLigthBox)
  const { data: posts, error, mutate } = useSWR<any[]>('/api/content/halloween')

  const deleteContentSelect = async (id: string) => {
    await deleteContent(id)
    mutate()
  }

  if (error) return <div>failed to load</div>
  if (!posts) return <div>loading...</div>

  return (
    <div className="text-center mt-5">
      <h1 className="text-2xl font-bold md:text-4xl">
        🎃🏴‍☠️ Halloween <span className="text-red-500">igloolab</span> 👻👽
      </h1>
      <h3>Sube una foto de tu disfraz 📸</h3>
      <button
        onClick={closeModal}
        className="bg-blue-500 hover:bg-blue-700 text-white mt-5 font-bold py-2 px-4 rounded"
      >
        Subir foto
      </button>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
        {posts
          .sort((postA, postB) => postB.likesBy.length - postA.likesBy.length)
          .map((post, index) => (
            <div
              key={post.id}
              className={`${index === 0 && 'sm:row-span-2	sm:col-span-2'}`}
            >
              <Image
                src={getUrlCloudnaryLowQuality(post.photo)}
                alt={post.name}
                width="100%"
                onClick={() => {
                  setPetSelected(post)
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
                  className={`${
                    index === 0 ? 'text-3xl' : 'text-xl'
                  } font-bold`}
                >
                  {post.name}
                </p>
                {session?.user.id === post.owner.id && (
                  <button onClick={() => deleteContentSelect(post.id)}>
                    ❌
                  </button>
                )}
              </div>

              <div className="flex items-center justify-center gap-1">
                <Image
                  src={post.owner.image}
                  alt={post.owner.name || ''}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <Link href={`/profile/${post.owner.id}`}>
                  <a className={`${index === 0 ? 'text-base' : 'text-sm'}`}>
                    {post.owner.name}
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
      <CreateContentModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  )
}

HalloweenPage.requireAuth = true

export default HalloweenPage
