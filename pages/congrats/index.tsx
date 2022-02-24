import { ICongrat } from 'models/Congrat.model'
import useSWR from 'swr'

const CongrastPage = () => {
  const { data, error } = useSWR<ICongrat[]>('/api/congrat')

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div className="text-center mt-5">
      <h1 className="text-2xl font-bold md:text-4xl">La crem de la crem 🧴</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white mt-5 font-bold py-2 px-4 rounded">
        Crear una tarjeta
      </button>

      <div className="mt-5">
        <h2 className="text-2xl font-bold md:text-4xl">Tus congrados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((congrat) => (
            <div key={congrat.id} className="bg-white shadow-md rounded p-4">
              <p className="text-gray-700 text-sm">{congrat.message}</p>

              <div className="flex justify-between">
                <p className="text-gray-700 text-sm">{congrat.createdAt}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                  Editar
                </button>

                <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default CongrastPage
