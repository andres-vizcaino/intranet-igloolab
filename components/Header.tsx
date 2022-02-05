import Logo from 'components/Logo'
import NavUserOutlet from './NavUserOutlet'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

const Header = () => {
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        if (theme === 'dark') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }, [theme, setTheme])

    return (
        <header className="flex items-center justify-between w-full max-w-4xl px-2 mx-auto my-4">
            <Logo />
            <div className="flex items-center">
                <button
                    type="button"
                    className="font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                    onClick={() =>
                        setTheme(theme === 'dark' ? 'light' : 'dark')
                    }
                >
                    {theme === 'dark' ? '🌞' : '🌚'}
                </button>
                <NavUserOutlet />
            </div>
        </header>
    )
}

export default Header
