import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { createProfile } from 'services/profile.services'

const NewUser: NextPage = () => {
  const [profileData, setProfileData] = useState({
    bio: '',
    birthday: '',
  })
  const { data: session } = useSession()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createProfile(session?.user.id, profileData.bio, profileData.birthday)
    router.push('/')
  }

  return (
    <div className="w-full max-w-4xl px-2 mx-auto mt-10">
      <h3 className="text-center text-3xl font-semibold">
        Hablanos un poco de tí!
      </h3>
      <form className="mt-4" onSubmit={handleSubmit}>
        <label
          htmlFor="bio"
          className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
        >
          ¿Cuál es tu biografía?
        </label>
        <textarea
          id="bio"
          autoFocus
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-800"
          value={profileData.bio}
          onChange={({ target }) =>
            setProfileData({ ...profileData, bio: target.value })
          }
          placeholder="Escribe aquí tu biografía"
        />

        <label htmlFor="birthday">Fecha de tu 🎂🥳🎉</label>
        <input
          id="birthday"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-800"
          type="date"
          value={profileData.birthday}
          onChange={({ target }) =>
            setProfileData({ ...profileData, birthday: target.value })
          }
        />
        <button
          className="disabled:bg-slate-300 dark:disabled:bg-gray-300 mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={!profileData.bio || !profileData.birthday}
        >
          Enviar
        </button>
      </form>
    </div>
  )
}

export default NewUser
