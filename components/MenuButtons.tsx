import { useSession } from 'next-auth/react'
import Link from 'next/link'
import CreateTweet from './CreateTweet'

const MenuButtons = () => {
  const { data: session, status } = useSession()

  if (status === 'unauthenticated' || session == null) return null

  return (
    <div className="flex justify-center gap-1 sm:gap-10 flex-col sm:flex-row items-center">
      <CreateTweet />
      <Link href={'/profile'}>
        <a
          type="button"
          className="mt-4 max-w-lg bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ver directorio 👀
        </a>
      </Link>

      <Link href={'/pets'}>
        <a
          type="button"
          className="mt-4 max-w-lg bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ver mascotas 🐶
        </a>
      </Link>

      <Link href={'/blog'}>
        <a
          type="button"
          className="mt-4 max-w-lg bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ir al Blog 🍕
        </a>
      </Link>

      <Link href={'/boards'}>
        <a
          type="button"
          className="mt-4 max-w-lg bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ir tus tableros 📋
        </a>
      </Link>

      <Link href={'/creative'}>
        <a
          type="button"
          className="mt-4 max-w-lg bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Muro creativo
        </a>
      </Link>

      <Link href={'/congrats'}>
        <a
          type="button"
          className="mt-4 max-w-lg bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Muro de ⭐️
        </a>
      </Link>
    </div>
  )
}

export default MenuButtons
