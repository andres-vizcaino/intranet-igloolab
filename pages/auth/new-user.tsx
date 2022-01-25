import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import { createProfile } from 'services/profile.services'

const NewUser: NextPage = () => {
  const [bio, setBio] = useState('')
  const { data: session } = useSession()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await createProfile(session?.user.id, bio)
    console.log(res)
  }

  return (
    <div>
      <h3 className="text-center text-3xl font-semibold">
        Hablanos un poco de tí!
      </h3>
      <form className="mt-4" onSubmit={handleSubmit}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          ¿Cuál es tu biografía?
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
