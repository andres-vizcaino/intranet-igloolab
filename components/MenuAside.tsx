import Link from 'next/link'

const MENUS = [
  {
    name: 'Estados',
    icon: 'fa fa-map-marker',
    url: '/',
  },

  {
    name: 'Cocola',
    icon: 'fa fa-users',
    url: '/cocola',
  },

  {
    name: 'Directorio',
    icon: 'fa fa-address-book',
    url: '/profile',
  },

  {
    name: 'Mascotas',
    icon: 'fa fa-paw',
    url: '/pets',
  },

  {
    name: 'Blog',
    icon: 'fa fa-newspaper',
    url: '/blog',
  },

  {
    name: 'Muro creativo',
    icon: 'fa fa-paint-brush',
    url: '/creative',
  },

  {
    name: 'Talks',
    icon: 'fa fa-coffee',
    url: 'https://talks.igloolab.co/',
  },

  {
    name: 'Muro de estrellas',
    icon: 'fa fa-star',
    url: '/congrats',
  },
]

const MenuAside = () => (
  <ul className="space-y-2 tracking-wide mt-8">
    {MENUS.map((menu, index) => {
      const pathname = window.location.pathname

      const styleButton =
        pathname === menu.url
          ? 'rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400'
          : 'rounded-md text-gray-600 dark:text-gray-200 group'

      return (
        <Link key={index} href={menu.url}>
          <li>
            <a
              aria-label="dashboard"
              className={
                'relative px-4 py-3 flex items-center space-x-4 cursor-pointer ' +
                styleButton
              }
            >
              <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                  className="fill-current text-cyan-400 dark:fill-slate-600"
                ></path>
                <path
                  d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                  className="fill-current text-cyan-200 group-hover:text-cyan-300"
                ></path>
                <path
                  d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                  className="fill-current group-hover:text-sky-300"
                ></path>
              </svg>
              <span className="-mr-1 font-medium">{menu.name}</span>
            </a>
          </li>
        </Link>
      )
    })}
  </ul>
)

export default MenuAside
