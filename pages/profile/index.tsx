import { IUser } from 'models/User.model'
import { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import Image from 'next/image'
import {
  diffDaysToNow,
  getDateToStringWithCurrentYear,
} from 'utils/getDayandMonth'
import { allConfetti } from 'utils/fireworks-conffeti'

const Profile: NextPage = () => {
  const { data, error } = useSWR<IUser[]>('/api/users')

  if (error) return <div>failed to load</div>
  if (!data) return <div>Cargando todos los usuarios...</div>
  return (
    <div>
      <p className="text-center text-2xl">Directorio</p>
      <div className="flex gap-10 flex-wrap mt-10 justify-center">
        {data?.map((user) => {
          const daysLeft = diffDaysToNow(
            getDateToStringWithCurrentYear(user.profile?.birthday || '')
          )
          if (daysLeft == 0) allConfetti()
          return (
            <Link href={`/profile/${user.id}`} passHref key={user.id}>
              <div className="flex flex-col justify-center items-center">
                <Image
                  src={user?.image}
                  alt={`Foto de perfil ${user.name}`}
                  width={120}
                  height={120}
                  className="rounded-t-lg"
                  layout="fixed"
                  priority
                />
                <p className="mt-5 font-semibold">{user.name}</p>
                {daysLeft <= 10 && daysLeft > 0 && (
                  <p className="text-sm">
                    🎂 en {daysLeft} día{daysLeft === 1 ? '' : 's'}
                  </p>
                )}

                {daysLeft == 0 && <p className="text-sm">🎉 Hoy cumpleaños</p>}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Profile
