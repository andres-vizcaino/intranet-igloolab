import Tweet from 'components/Tweet'
import useUser from 'hooks/useUser'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { updateProfile } from 'services/profile.services'

const ProfileId: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [ownProfile, setownProfile] = useState(false)
  const [editProfile, seteditProfile] = useState(false)
  const [bio, setBio] = useState('')
  const { data: session } = useSession()
  const { isLoading, user, isError, mutate } = useUser(id as string)

  useEffect(() => {
    if (id === session?.user?.id) {
      setownProfile(true)
    } else {
      setownProfile(false)
    }
  }, [session, id])

  const handleClick = () => {
    seteditProfile(true)
    setBio(user?.profile?.bio || '')
  }

  const handleEditBio = async () => {
    await updateProfile(id as string, bio)
    mutate()
    seteditProfile(false)
  }

  if (isError) return <p>Error</p>
  if (isLoading) return <p>Loading</p>
  return (
    <>
      <div className="flex items-center justify-center flex-col gap-5">
        <Image
          src={user?.image || ''}
          alt={`Foto perfil ${user?.name}`}
          width={100}
          height={100}
          className="rounded-full"
        />

        <p className="text-center text-2xl">{user?.name}</p>

        <div className="mt-4">
          <p className="text-center text-red-500 text-sm">Biografia</p>
          {user?.profile ? (
            <>
              {editProfile ? (
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-800"
                  value={bio}
                  onChange={({ target }) => setBio(target.value)}
                  placeholder="Escribe aquí tu biografía"
                />
              ) : (
                <p className="text-center text-lg">{user?.profile?.bio}</p>
              )}
              {ownProfile && (
                <button
                  onClick={editProfile ? handleEditBio : handleClick}
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {editProfile ? 'Guardar' : 'Editar'}
                </button>
              )}
            </>
          ) : (
            <>
              <p className="text-center text-lg">Aún no tengo biografía 😞</p>
              {ownProfile && (
                <button
                  onClick={() => router.push('/auth/new-user')}
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Editar
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center">
        <p className="text-center text-red-500 text-sm">Mis estados</p>

        <div className="mt-4 flex flex-col gap-10">
          {user?.tweets.map((tweet) => (
            <Tweet key={tweet.id} {...tweet} />
          ))}
        </div>
      </div>
    </>
  )
}

export default ProfileId
