import Link from 'next/link'

const Footer = () => (
  <footer className="text-center text-sm font-semibold mt-5 mb-2">
    <Link href={'/'}>
      <a className="hover:opacity-90 font-bold text-sm relative after:content-['igloolab'] after:text-white after:bg-black after:px-1">
        Intranet <> </>
      </a>
    </Link>
    <> </>
    <span className="text-red-500 font-normal">v0.1.3</span>
  </footer>
)

export default Footer
