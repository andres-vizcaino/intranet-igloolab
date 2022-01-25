import { IUser } from 'models/User.model'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const { data, error } = useSWR<IUser[]>('/api/users')

  return (
    <div>
      {status === 'unauthenticated' || session == null ? (
        <p className="text-center text-4xl">No estás conectado. 🥲</p>
      ) : (
        <>
          <p className="text-center text-4xl">Ha iniciado la sesión. 😎</p>
          <div className="mt-4">
            <p className="text-center text-2xl">Directorio</p>
            {!error && !data ? (
              <p className="text-center text-lg">Cargando...</p>
            ) : (
              <div className="flex gap-10 flex-wrap mt-10">
                {data?.map((user) => (
                  <Link href={`/profile/${user.id}`} passHref key={user.id}>
                    <div className="flex flex-col justify-center items-stretch">
                      <Image
                        src={user?.image}
                        alt={`Foto de perfil ${user.name}`}
                        width={100}
                        height={100}
                        className="rounded-t-lg"
                      />
                      <p className="mt-5">{user.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Home
