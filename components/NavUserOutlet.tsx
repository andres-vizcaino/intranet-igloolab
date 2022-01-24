import { useSession } from 'next-auth/react'
import LoadingIcon from './LoadingIcon'
import { LoginButton } from './LoginButton'
import NavUserProfile from './NavUserProfile'

const NavUserOutlet = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') return <LoadingIcon />
  if (status === 'unauthenticated' || session == null) return <LoginButton />
  if (session.user != null) return <NavUserProfile user={session.user} />
  return null
}

export default NavUserOutlet
