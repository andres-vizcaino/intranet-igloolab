import useUser from 'hooks/useUser'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'

const ProfileId: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { isLoading, user, isError } = useUser(id as string)
  console.log(user)

  if (isError) return <p>Error</p>
  if (isLoading) return <p>Loading</p>
  return (
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
        <p className="text-center text-lg">{user?.profile?.bio}</p>
      </div>
    </div>
  )
}

export default ProfileId
