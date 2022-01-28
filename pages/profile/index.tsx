import { IUser } from 'models/User.model'
import { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import Image from 'next/image'
import { getTimeAgo } from 'utils/getTimeAgo'

const Profile: NextPage = () => {
  const { data, error } = useSWR<IUser[]>('/api/users')

  if (error) return <div>failed to load</div>
  if (!data) return <div>Cargando todos los usuarios...</div>
  return (
    <div>
      <p className="text-center text-2xl">Directorio</p>
      <div className="flex gap-10 flex-wrap mt-10 justify-center">
        {data?.map((user) => (
          <Link href={`/profile/${user.id}`} passHref key={user.id}>
            <div className="flex flex-col justify-center items-center">
              <Image
                src={user?.image}
                alt={`Foto de perfil ${user.name}`}
                width={120}
                height={120}
                className="rounded-t-lg"
                layout="fixed"
              />
              <p className="mt-5">{user.name}</p>
              {user.profile?.birthday && (
                <p className="text-xs">{getTimeAgo(user.profile.birthday)}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Profile
