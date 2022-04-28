import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

type Props = {
  children: React.ReactNode
}

const HomeLayout = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const { data: session, status } = useSession()
  const handleClick = () => signIn('google')
  const handleSignOut = () => signOut()

  // TODO: Separar todo en modulos mas pequenos

  return (
    <div className="flex h-screen overflow-y-hidden bg-white">
      <aside
        className={
          `fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform bg-white border-r shadow-lg lg:z-auto lg:static lg:shadow-none` +
          (!isOpen ? ' -translate-x-full lg:translate-x-0 lg:w-20' : '')
        }
      >
        <div
          className={
            'flex items-center justify-between flex-shrink-0 p-2' +
            (!isOpen ? ' lg:justify-center' : '')
          }
        >
          <span className="p-2 text-xl font-semibold leading-8 tracking-wider text-red-600 whitespace-nowrap">
            i<span className={!isOpen ? 'lg:hidden' : ''}>gloolab</span>
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-hidden hover:overflow-y-auto">
          <ul className="p-2 overflow-hidden">
            <li>
              <Link href="/">
                <a
                  className={
                    'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100' +
                    (!isOpen ? ' justify-center' : '')
                  }
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      className="w-6 h-6 text-black"
                      viewBox="0 0 48 48"
                    >
                      <path d="M12.55 40q-4.4 0-7.475-3.075Q2 33.85 2 29.45q0-3.9 2.5-6.85 2.5-2.95 6.35-3.55 1-4.85 4.7-7.925T24.1 8.05q5.6 0 9.45 4.075Q37.4 16.2 37.4 21.9v1.2q3.6-.1 6.1 2.325Q46 27.85 46 31.55q0 3.45-2.5 5.95T37.55 40zM24 24zM12.55 37h25q2.25 0 3.85-1.6t1.6-3.85q0-2.25-1.6-3.85t-3.85-1.6H34.4v-4.2q0-4.55-3.05-7.7-3.05-3.15-7.45-3.15t-7.475 3.15q-3.075 3.15-3.075 7.7h-.95q-3.1 0-5.25 2.175T5 29.45q0 3.15 2.2 5.35Q9.4 37 12.55 37z"></path>
                    </svg>
                  </span>
                  <span className={!isOpen ? 'lg:hidden' : ''}>Estados</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <a
                  className={
                    'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100' +
                    (!isOpen ? ' justify-center' : '')
                  }
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      className="w-6 h-6 text-black"
                      viewBox="0 0 48 48"
                    >
                      <path d="M1.9 40v-4.7q0-1.75.9-3.175Q3.7 30.7 5.3 30q3.65-1.6 6.575-2.3Q14.8 27 17.9 27q3.1 0 6 .7t6.55 2.3q1.6.7 2.525 2.125.925 1.425.925 3.175V40zm29.2-13.15q3.45.4 6.5 1.175t4.95 1.775q1.65.95 2.6 2.35.95 1.4.95 3.15V40h-9.2v-4.7q0-3.15-1.6-5.175t-4.2-3.275zm-13.2-2.9q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1zm18-7.5q0 3.3-2.1 5.4-2.1 2.1-5.4 2.1-.55 0-1.225-.075T25.95 23.6q1.2-1.25 1.825-3.075.625-1.825.625-4.075t-.625-3.975Q27.15 10.75 25.95 9.3q.55-.15 1.225-.25t1.225-.1q3.3 0 5.4 2.1 2.1 2.1 2.1 5.4zM4.9 37h26v-1.7q0-.8-.475-1.55T29.25 32.7q-3.6-1.6-6.05-2.15-2.45-.55-5.3-.55-2.85 0-5.325.55T6.5 32.7q-.7.3-1.15 1.05-.45.75-.45 1.55zm13-16.05q1.95 0 3.225-1.275Q22.4 18.4 22.4 16.45q0-1.95-1.275-3.225Q19.85 11.95 17.9 11.95q-1.95 0-3.225 1.275Q13.4 14.5 13.4 16.45q0 1.95 1.275 3.225Q15.95 20.95 17.9 20.95zm0-4.5zm0 13.55z"></path>
                    </svg>
                  </span>
                  <span className={!isOpen ? 'lg:hidden' : ''}>Directorio</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/pets">
                <a
                  className={
                    'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100' +
                    (!isOpen ? ' justify-center' : '')
                  }
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      className="w-6 h-6 text-black"
                      viewBox="0 0 48 48"
                    >
                      <path d="M8.5 23.75q-1.9 0-3.2-1.3-1.3-1.3-1.3-3.2 0-1.9 1.3-3.2 1.3-1.3 3.2-1.3 1.9 0 3.2 1.3 1.3 1.3 1.3 3.2 0 1.9-1.3 3.2-1.3 1.3-3.2 1.3zm9.25-8.5q-1.9 0-3.2-1.3-1.3-1.3-1.3-3.2 0-1.9 1.3-3.2 1.3-1.3 3.2-1.3 1.9 0 3.2 1.3 1.3 1.3 1.3 3.2 0 1.9-1.3 3.2-1.3 1.3-3.2 1.3zm12.5 0q-1.9 0-3.2-1.3-1.3-1.3-1.3-3.2 0-1.9 1.3-3.2 1.3-1.3 3.2-1.3 1.9 0 3.2 1.3 1.3 1.3 1.3 3.2 0 1.9-1.3 3.2-1.3 1.3-3.2 1.3zm9.25 8.5q-1.9 0-3.2-1.3-1.3-1.3-1.3-3.2 0-1.75 1.3-3.125t3.2-1.375q1.9 0 3.2 1.3 1.3 1.3 1.3 3.2 0 1.9-1.3 3.2-1.3 1.3-3.2 1.3zm-26.2 20.5q-2.1 0-3.45-1.575T8.5 38.95q0-2.1 1.275-3.725T12.5 32.1q1.1-1.1 2.05-2.325.95-1.225 1.8-2.525 1.45-2.2 3.25-4.1 1.8-1.9 4.4-1.9 2.6 0 4.425 1.9 1.825 1.9 3.275 4.15.85 1.3 1.775 2.5.925 1.2 2.025 2.3 1.45 1.5 2.725 3.125Q39.5 36.85 39.5 38.95q0 2.15-1.35 3.725-1.35 1.575-3.45 1.575-2.7 0-5.35-.45-2.65-.45-5.35-.45-2.7 0-5.35.45-2.65.45-5.35.45z"></path>
                    </svg>
                  </span>
                  <span className={!isOpen ? 'lg:hidden' : ''}>Mascotas</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <a
                  className={
                    'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100' +
                    (!isOpen ? ' justify-center' : '')
                  }
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      className="w-6 h-6 text-black"
                      viewBox="0 0 48 48"
                    >
                      <path d="M40.5 29.05l-3.55-3.55 1.45-1.45q.4-.4 1.05-.4t1.05.4l1.45 1.45q.4.4.4 1.05t-.4 1.05zM24 42v-3.55l10.8-10.8 3.55 3.55L27.55 42zM6 31.5v-3h15v3zm0-8.25v-3h23.5v3zM6 15v-3h23.5v3z"></path>
                    </svg>
                  </span>
                  <span className={!isOpen ? 'lg:hidden' : ''}>Blog</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/boards">
                <a
                  className={
                    'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100' +
                    (!isOpen ? ' justify-center' : '')
                  }
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      className="w-6 h-6 text-black"
                      viewBox="0 0 48 48"
                    >
                      <path d="M26 17.5v-3h18v3zm0 16v-3h18v3zM11.1 21.3L4 14.2l2.1-2.1 5 4.95 8.95-8.95 2.1 2.15zm0 16L4 30.2l2.1-2.1 5 4.95 8.95-8.95 2.1 2.15z"></path>
                    </svg>
                  </span>
                  <span className={!isOpen ? 'lg:hidden' : ''}>Tableros</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/creative">
                <a
                  className={
                    'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100' +
                    (!isOpen ? ' justify-center' : '')
                  }
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      className="w-6 h-6 text-black"
                      viewBox="0 0 48 48"
                    >
                      <path d="M24 44q-1.35 0-2.375-.65t-1.325-1.8h-.7q-1.2 0-2.1-.9-.9-.9-.9-2.1V31.4q-3.3-2.15-5.2-5.5-1.9-3.35-1.9-7.4 0-6.05 4.225-10.275Q17.95 4 24 4q6.05 0 10.275 4.225Q38.5 12.45 38.5 18.5q0 4.05-1.9 7.4-1.9 3.35-5.2 5.5v7.15q0 1.2-.9 2.1-.9.9-2.1.9h-.7q-.3 1.15-1.325 1.8Q25.35 44 24 44zm-4.4-5.45h8.8v-2.2h-8.8zm0-4.2h8.8v-2h-8.8zm-.45-5h3.7V22.5l-4.6-4.6 1.55-1.55 4.2 4.2 4.2-4.2 1.55 1.55-4.6 4.6v6.85h3.7q3-1.4 4.825-4.35 1.825-2.95 1.825-6.5 0-4.85-3.325-8.175Q28.85 7 24 7q-4.85 0-8.175 3.325Q12.5 13.65 12.5 18.5q0 3.55 1.825 6.5t4.825 4.35zm4.85-8.8zm0-2.4z"></path>
                    </svg>
                  </span>
                  <span className={!isOpen ? 'lg:hidden' : ''}>
                    Muro Creativo
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/congrats">
                <a
                  className={
                    'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100' +
                    (!isOpen ? ' justify-center' : '')
                  }
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      className="w-6 h-6 text-black"
                      viewBox="0 0 48 48"
                    >
                      <path d="M38.6 16.25l-2.15-5-5.2-2.3 5.2-2.25 2.15-4.75 2.15 4.75 5.2 2.25-5.2 2.3zm0 29.75l-2.15-4.8-5.2-2.25 5.2-2.25 2.15-5.05 2.15 5.05 5.2 2.25-5.2 2.25zm-21.95-7.7l-4.6-9.85L2 23.95l10.05-4.5 4.6-9.8 4.65 9.8 10 4.5-10 4.5zm0-7.4l2.4-4.8 4.9-2.15-4.9-2.15-2.4-4.8-2.35 4.8-4.95 2.15 4.95 2.15zm0-6.95z"></path>
                    </svg>
                  </span>
                  <span className={!isOpen ? 'lg:hidden' : ''}>
                    Muro de estellas
                  </span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex-shrink-0 p-2 border-t max-h-14">
          {status === 'authenticated' ? (
            <button
              onClick={handleSignOut}
              className={
                'flex items-center justify-center w-full px-4 py-2 space-x-1 font-medium tracking-wider uppercase bg-gray-100 border rounded-md focus:outline-none focus:ring'
              }
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
              </span>
              <span className={!isOpen ? 'lg:hidden' : ''}>
                {' '}
                Cerrar sesión{' '}
              </span>
            </button>
          ) : (
            <button
              onClick={handleClick}
              className={
                'flex items-center justify-center w-full px-4 py-2 space-x-1 font-medium tracking-wider uppercase bg-gray-100 border rounded-md focus:outline-none focus:ring'
              }
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  x="0"
                  y="0"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                  ></path>
                </svg>
              </span>
              <span className={!isOpen ? 'lg:hidden' : ''}> Ingresar </span>
            </button>
          )}
        </div>
      </aside>

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <header className="flex-shrink-0 border-b">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center space-x-3">
              <span className="p-2 text-xl font-semibold tracking-wider uppercase lg:hidden">
                K-WD
              </span>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md focus:outline-none focus:ring"
              >
                <svg
                  className={
                    'w-4 h-4 text-gray-600' +
                    (isOpen
                      ? ' transform transition-transform -rotate-180'
                      : '')
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  ></path>
                </svg>
              </button>

              <a
                href="https://trello.com/b/Hdmig9rd/intranet"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-4 py-1 space-x-1 bg-red-600 text-white rounded-md shadow hover:bg-opacity-80"
              >
                <span>¿Tienes ideas para la intranet?</span>
              </a>
            </div>

            <div className="relative flex items-center space-x-3">
              <div className="items-center hidden space-x-3 md:flex">
                <div className="relative">
                  <div className="absolute right-0 p-1 bg-red-400 rounded-full animate-ping"></div>
                  <div className="absolute right-0 p-1 bg-red-400 border rounded-full"></div>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-500"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setIsOpenMenu(!isOpenMenu)}
                    className="p-1 bg-gray-200 rounded-full focus:outline-none focus:ring"
                  >
                    <img
                      className="object-cover w-8 h-8 rounded-full"
                      src={session?.user.image || '/img/rojo.jpeg'}
                      alt={session?.user.name || 'Avatar'}
                    />
                  </button>
                  <div className="absolute right-0 p-1 bg-green-400 rounded-full bottom-3 animate-ping"></div>
                  <div className="absolute right-0 p-1 bg-green-400 border border-white rounded-full bottom-3"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
          <div className="mt-6">{children}</div>
        </main>

        <footer className="flex items-center justify-between flex-shrink-0 p-4 border-t max-h-14">
          <div>igloolab &copy; 2022 - v0.3.0</div>
          <div className="text-sm">
            Dev: &nbsp;
            <a
              className="text-blue-400 underline"
              href="https://www.instagram.com/pipegoods/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Andrés Vizcaíno
            </a>
          </div>
          <div>
            <a
              href="https://github.com/andres-vizcaino/intranet-igloolab"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1"
            >
              <svg
                fill="currentColor"
                className="w-6 h-6 text-black"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                ></path>
              </svg>
              <span className="hidden text-sm md:block">Ver en Github</span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default HomeLayout
