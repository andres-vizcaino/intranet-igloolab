import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Header from 'components/Header'

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  return (
    <>
      <Header />
      {status === 'unauthenticated' || session == null ? (
        <p>No estás conectado.</p>
      ) : (
        <p>Ha iniciado la sesión.</p>
      )}
    </>
  )
}

export default Home
