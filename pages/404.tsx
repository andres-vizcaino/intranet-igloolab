import Link from 'next/link'

const Custom404 = () => (
  <div className="grid place-content-center min-h-screen gap-5 items-center">
    <h1 className="text-6xl">Esta sección no existe 🥺</h1>
    <Link href="/">
      <a className="bg-blue-500 text-center hover:bg-blue-700 text-white py-2 px-4 rounded">
        Volver al inicio
      </a>
    </Link>
  </div>
)

export default Custom404
