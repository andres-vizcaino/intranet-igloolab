import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { createProfile } from 'services/profile.services'

const NewUser: NextPage = () => {
  const [bio, setBio] = useState('')
  const { data: session } = useSession()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createProfile(session?.user.id, bio)
    router.push('/')
  }

  return (
    <div>
      <h3 className="text-center text-3xl font-semibold">
        Hablanos un poco de tí!
      </h3>
      <form className="mt-4" onSubmit={handleSubmit}>
        <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
          ¿Cuál es tu biografía?
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-800"
          value={bio}
          onChange={({ target }) => setBio(target.value)}
          placeholder="Escribe aquí tu biografía"
        />
        <button
          className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}

export default NewUser
