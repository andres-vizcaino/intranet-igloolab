import Link from 'next/link'

const Logo = () => (
  <Link href={'/'}>
    <a className="hover:opacity-90 font-bold text-2xl relative after:content-['igloolab'] dark:after:text-black dark:after:bg-white  after:text-white after:bg-black after:px-1">
      Intranet <> </>
    </a>
  </Link>
)

export default Logo
