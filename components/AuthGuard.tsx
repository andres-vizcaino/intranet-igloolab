import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { status } = useSession()

  const router = useRouter()

  useEffect(() => {
    console.log(status)
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  return <>{children}</>
}

export default AuthGuard
