import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { PropsWithChildren, useEffect, useState } from 'react'
import MenuAside from './MenuAside'

const Layout = ({ children }: PropsWithChildren) => {
  const { data: session } = useSession()
  const [isOpenMenuMobile, setIsOpenMenuMobile] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (theme === 'dark') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [theme, setTheme])

  const handleToggleMenuMobile = () => {
    setIsOpenMenuMobile(!isOpenMenuMobile)
  }

  return (
    <>
      <aside
        className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white dark:bg-slate-800
       transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]"
      >
        <div>
          <div className="-mx-6 px-6 py-4">
            <a href="#" title="home">
              <svg
                className="h-auto w-24 fill-black dark:fill-white"
                fill="none"
                viewBox="0 0 76 24"
              >
                <g clip-path="url(#a)">
                  <path d="M13.5882 5.99887v1.14796s-.8493-1.14796-3.0166-1.14796c-3.27765 0-5.7237 2.69347-5.7237 5.99893 0 3.3054 2.45047 5.9988 5.7237 5.9988 2.4549 0 3.0166-1.1479 3.0166-1.1479v1.1479c0 1.5589-1.2562 2.8275-2.7999 2.8275-1.54371 0-2.78663-1.2775-2.7999-2.8275H4.8479c.00885 3.301 2.67163 5.9989 5.9404 5.9989 3.2688 0 5.9404-2.6934 5.9404-5.9989V5.99887h-3.1405Zm-2.7999 8.82633c-1.54371 0-2.7999-1.2685-2.7999-2.8274 0-1.559 1.25619-2.82752 2.7999-2.82752 1.5437 0 2.7999 1.26852 2.7999 2.82752 0 1.5589-1.2562 2.8274-2.7999 2.8274Zm16.9543 3.1759c-3.2776 0-5.9404-2.6934-5.9404-5.9989 0-3.30537 2.6673-5.99884 5.9404-5.99884 3.2732 0 5.9405 2.69347 5.9405 5.99884 0 3.3055-2.6673 5.9989-5.9405 5.9989Zm0-8.82633c-1.5437 0-2.7999 1.26853-2.7999 2.82743 0 1.5589 1.2562 2.8275 2.7999 2.8275 1.5438 0 2.8-1.2686 2.8-2.8275 0-1.5589-1.2562-2.82743-2.8-2.82743ZM40.424 18.0011c-3.2776 0-5.9404-2.6934-5.9404-5.9989 0-3.30537 2.6673-5.99884 5.9404-5.99884 3.2732 0 5.9404 2.69347 5.9404 5.99884 0 3.3055-2.6672 5.9989-5.9404 5.9989Zm0-8.82633c-1.5437 0-2.7999 1.26853-2.7999 2.82743 0 1.5589 1.2562 2.8275 2.7999 2.8275 1.5438 0 2.8-1.2686 2.8-2.8275 0-1.5589-1.2562-2.82743-2.8-2.82743ZM21.006 0h-3.1405v18.0011h3.1405V0Zm29.2949.0357361h-3.1405V18.0369h3.1405V.0357361ZM70.2719 6.03462c-2.1674 0-3.0167 1.14796-3.0167 1.14796V.0357361h-3.1405V18.0369h3.1405v-1.148s.8493 1.148 3.0167 1.148c3.2776 0 5.7237-2.6935 5.7237-5.9989 0-3.30545-2.4505-5.99891-5.7237-5.99891v-.00447Zm-.2167 8.82638c-1.5438 0-2.8-1.2686-2.8-2.8275 0-1.5589 1.2562-2.82747 2.8-2.82747 1.5437 0 2.7999 1.26857 2.7999 2.82747s-1.2562 2.8275-2.7999 2.8275ZM59.8375 6.03461v1.14796s-.8493-1.14796-3.0167-1.14796c-3.2776 0-5.7236 2.69346-5.7236 5.99889 0 3.3054 2.4504 5.9989 5.7236 5.9989 1.8799 0 3.0167-1.148 3.0167-1.148v1.148h3.1405V6.03461h-3.1405ZM57.0376 14.861c-1.5437 0-2.7999-1.2686-2.7999-2.8275 0-1.5589 1.2562-2.82748 2.7999-2.82748s2.7999 1.26858 2.7999 2.82748-1.2562 2.8275-2.7999 2.8275ZM2.14089 3.37242c.91608 0 1.65871-.74994 1.65871-1.67504 0-.925099-.74263-1.6750411-1.65871-1.6750411-.91608 0-1.658712.7499421-1.658712 1.6750411 0 .9251.742632 1.67504 1.658712 1.67504ZM0 5.9989v1.14796h.566174v9.26854c0 .8755.703296 1.5857 1.570246 1.5857.86696 0 1.57025-.7102 1.57025-1.5857V7.14686h.56617V5.9989H0Z" />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h76v24H0z" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>

          <div className="mt-8 text-center">
            <picture>
              <img
                src={session?.user.image || '/img/cr7.png'}
                alt={`Foto de perfil de ${session?.user.name}`}
                className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
              />
            </picture>
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 dark:text-gray-300 lg:block">
              {session?.user.name}
            </h5>
            <span className="hidden text-xs text-gray-400 lg:block">
              {session?.user.email}
            </span>
          </div>

          <MenuAside />
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button
            onClick={() => signOut()}
            className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 dark:text-gray-300 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="group-hover:text-gray-700 dark:group-hover:text-gray-200 ">
              Cerrar sesión
            </span>
          </button>
        </div>
      </aside>

      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div
          className="sticky z-10 top-0 h-16 border-b bg-white dark:bg-slate-800
       lg:py-2.5"
        >
          <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5
              hidden
              className="text-2xl text-gray-600 dark:text-gray-300 font-medium lg:block"
            >
              Intranet
            </h5>
            <button
              onClick={handleToggleMenuMobile}
              className="w-12 h-16 -mr-2 border-r lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 my-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex space-x-4">
              <button
                aria-label="notification"
                className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? '🌞' : '🌚'}
              </button>

              <button
                aria-label="notification"
                className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 lg:hidden p-1"
              >
                <picture>
                  <img
                    src={session?.user.image || '/img/cr7.png'}
                    alt={`Foto de perfil de ${session?.user.name}`}
                    className="object-cover w-full h-full rounded-xl"
                  />
                </picture>
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <div
          className={`fixed z-20 top-0 left-0 w-full h-full bg-black bg-opacity-50 transition-all duration-300 ${
            isOpenMenuMobile ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        ></div>
        <div
          className={`fixed z-30 top-0 left-0 w-64 h-full bg-white dark:bg-slate-800 transition-all duration-300 transform ${
            isOpenMenuMobile ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="px-6 py-4 flex items-center justify-between border-b">
            <h5 className="text-2xl text-gray-600 dark:text-gray-300 font-medium">
              Intranet
            </h5>
            <button
              onClick={handleToggleMenuMobile}
              className="w-12 h-12 -mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 my-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex space-x-4">
            <MenuAside />
          </div>
        </div>
        <div className="px-6 pt-6 2xl:container">{children}</div>
      </div>
    </>
  )
}

export default Layout
