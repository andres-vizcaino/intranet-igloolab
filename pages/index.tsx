import type { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button
        className="bg-red-600 text-white p-2 rounded-md"
        onClick={() => signIn('google')}
      >
        Sign in
      </button>
    </>
  )
}

export default Home
