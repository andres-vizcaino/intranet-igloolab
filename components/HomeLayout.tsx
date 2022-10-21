import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {
  children: JSX.Element
}

const HomeLayout = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const { data: session } = useSession()
  const handleSignOut = () => signOut()

  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (theme === 'dark') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [theme, setTheme])

  // TODO: Separar todo en modulos mas pequenos

  return (
    <div className="flex h-screen overflow-y-hidden bg-white dark:bg-gray-800 dark:text-white">
      <aside
        className={
          `fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform dark:bg-gray-600 bg-white border-r shadow-lg lg:z-auto lg:static lg:shadow-none` +
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
                    <Image
                      src="/icons/new-48.png"
                      width={24}
                      height={24}
                      alt="icon menu"
                    />
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
                    <Image
                      src="/icons/astronauta-48.png"
                      width={24}
                      height={24}
                      alt="icon menu"
                    />
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
                    <Image
                      src="/icons/pet-48.png"
                      width={24}
                      height={24}
                      alt="icon menu"
                    />
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
                    <Image
                      src="/icons/blog-48.png"
                      width={24}
                      height={24}
                      alt="icon menu"
                    />
                  </span>
                  <span className={!isOpen ? 'lg:hidden' : ''}>Blog</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/amor-amistad">
                <a
                  className={
                    'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100' +
                    (!isOpen ? ' justify-center' : '')
                  }
                >
                  <span>
                    <Image
                      src="/icons/amor-relleno.png"
                      width={24}
                      height={24}
                      alt="icon menu"
                    />
                  </span>
                  <span className={!isOpen ? 'lg:hidden' : ''}>
                    Amor/amistad
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/semana-salud/la-mejor-mandala">
                <a
                  className={
                    'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100' +
                    (!isOpen ? ' justify-center' : '')
                  }
                >
                  <span>
                    <Image
                      src="/icons/mandala.png"
                      width={24}
                      height={24}
                      alt="icon menu"
                    />
                  </span>
                  <span className={!isOpen ? 'lg:hidden' : ''}>Mandalas</span>
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
                    <Image
                      src="/icons/foco-48.png"
                      width={24}
                      height={24}
                      alt="icon menu"
                    />
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
                    <Image
                      src="/icons/star-48.png"
                      width={24}
                      height={24}
                      alt="icon menu"
                    />
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
          <button
            onClick={handleSignOut}
            className={
              'flex items-center justify-center w-full px-4 py-2 space-x-1 font-medium tracking-wider uppercase bg-gray-100 border rounded-md focus:outline-none focus:ring'
            }
          >
            <span>
              <Image
                src="/icons/out-48.png"
                width={12}
                height={12}
                alt="icon menu"
              />
            </span>
            <span className={!isOpen ? 'lg:hidden text-black' : 'text-black'}>
              {' '}
              Cerrar sesión{' '}
            </span>
          </button>
        </div>
      </aside>

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <header className="flex-shrink-0 border-b">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center space-x-3">
              <span className="p-2 text-xl font-semibold tracking-wider uppercase lg:hidden">
                igloolab
              </span>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md focus:outline-none focus:ring"
              >
                <svg
                  className={
                    'w-4 h-4 text-gray-600 dark:text-white' +
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
                    onClick={() =>
                      setTheme(theme === 'dark' ? 'light' : 'dark')
                    }
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring"
                  >
                    {theme === 'dark' ? '🌞' : '🌚'}
                  </button>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setIsOpenMenu(!isOpenMenu)}
                    className="p-1 bg-gray-200 rounded-full focus:outline-none focus:ring"
                  >
                    <Image
                      className="object-cover rounded-full w-8 h-8"
                      src={session?.user.image || '/img/rojo.jpeg'}
                      alt={session?.user.name || 'Avatar'}
                      width={32}
                      height={32}
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
          <div>igloolab &copy; 2022 - v0.9.0</div>
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
                className="w-6 h-6 text-black dark:text-white"
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
