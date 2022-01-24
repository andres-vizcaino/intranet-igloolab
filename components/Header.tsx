import Logo from 'components/Logo'
import NavUserOutlet from './NavUserOutlet'

const Header = () => (
  <header className="flex items-center justify-between w-full max-w-4xl px-2 mx-auto my-4">
    <Logo />
    <div>
      <NavUserOutlet />
    </div>
  </header>
)

export default Header
