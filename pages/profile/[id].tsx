import Tweet from 'components/Tweet'
import useUser from 'hooks/useUser'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { updateProfile } from 'services/profile.services'
import { getDayandMonthName } from 'utils/getDayandMonth'
import { getStringToDate } from 'utils/getStringToDate'
import { getTimeAgo } from 'utils/getTimeAgo'

const ProfileId: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [ownProfile, setownProfile] = useState(false)
  const [editProfile, seteditProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    bio: '',
    birthday: '',
  })
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
    console.log(user?.profile?.birthday || '')

    setProfileData({
      ...profileData,
      bio: user?.profile?.bio || '',
      birthday: getStringToDate(user?.profile?.birthday || ''),
    })
  }

  const handleEditBio = async () => {
    if (
      profileData.bio !== user?.profile?.bio ||
      profileData.birthday !== user?.profile?.birthday
    ) {
      await updateProfile(id as string, profileData.bio, profileData.birthday)
      mutate()
    }
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
                <div className="text-center">
                  <textarea
                    autoFocus
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-800"
                    value={profileData.bio}
                    onChange={({ target }) =>
                      setProfileData({ ...profileData, bio: target.value })
                    }
                    placeholder="Escribe aquí tu biografía"
                  />
                  <div className="inline-flex gap-2 items-center">
                    <label htmlFor="birthday">Fecha de 🎂</label>
                    <input
                      id="birthday"
                      className="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-800"
                      type="date"
                      value={profileData.birthday}
                      onChange={({ target }) =>
                        setProfileData({
                          ...profileData,
                          birthday: target.value,
                        })
                      }
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-center text-lg">{user?.profile?.bio}</p>
                  <p className="text-center text-lg">
                    🎂 {getDayandMonthName(user?.profile?.birthday)}
                  </p>
                </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="mt-10 flex flex-col items-center">
          <p className="text-center text-red-500 text-sm">Mis estados</p>

          <div className="mt-4 flex flex-col gap-10">
            {user?.tweets.map((tweet) => (
              <Tweet key={tweet.id} {...tweet} />
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <p className="text-center text-red-500 text-sm">Mis Articulos</p>

          <div className="mt-4 flex flex-col gap-10">
            {user?.posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <a>
                  <p className="text-center text-2xl font-medium">
                    {post.title}
                  </p>
                  <p className="text-center text-sm">
                    {getTimeAgo(post.createdAt)}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileId
