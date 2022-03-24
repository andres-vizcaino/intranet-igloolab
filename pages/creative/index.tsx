import { Category } from '@prisma/client'
import CardCreative from 'components/CardCreative'
import { ICreative } from 'models/Creative.model'
import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'

const WallCreative = () => {
  const { data } = useSWR<ICreative[]>('/api/creative')
  const { data: categories } = useSWR<Category[]>('/api/category')
  const [categorySelect, setCategorySelect] = useState<string>('')

  const handleChangeCategory = (category: string) => setCategorySelect(category)

  return (
    <>
      <div className="text-center">
        <h2 className="text-center text-4xl mt-5 font-bold">Muro creativo 🖌</h2>
        <p className="text-center text-lg mt-3">
          Aquí podrás compartir tus creaciones fruto de tu aprendizaje 📚,
          inspira a otros a aprender 💡
        </p>

        <button className="bg-blue-400 text-white font-bold py-2 px-4 rounded-full mt-5">
          <Link href="/creative/create">
            <a>Crear un post creativo</a>
          </Link>
        </button>
      </div>

      <div className="mt-10 mb-5 flex w-full flex-wrap gap-5">
        <div
          onClick={() => handleChangeCategory('')}
          className={`${
            categorySelect === '' ? 'bg-red-600 text-white ' : 'bg-transparent'
          }  cursor-pointer rounded-full border-2 px-5 hover:bg-red-300 hover:text-white transition`}
        >
          <h3 className="text-lg">
            <span className="text-sm">({data?.length})</span> Todo
          </h3>
        </div>
        {categories?.map((category) => (
          <div
            onClick={() => handleChangeCategory(category.id)}
            className={`${
              categorySelect === category.id
                ? 'bg-red-600 text-white '
                : 'bg-transparent'
            }  cursor-pointer rounded-full border-2 px-5 hover:bg-red-300 hover:text-white transition`}
            key={category.id}
          >
            <h3 className="text-lg">
              <span className="text-sm">
                ({data?.filter((e) => e.Category.id === category.id).length}){' '}
              </span>
              {category.name}
            </h3>
          </div>
        ))}
      </div>

      <div className=" flex flex-wrap -mx-4">
        {data
          ?.filter((e) => e.Category.id.includes(categorySelect))
          .map((creative) => (
            <CardCreative
              key={creative.id}
              image={creative.image}
              author={creative.author}
              category={creative.Category}
              title={creative.title}
              id={creative.id}
            />
          ))}
      </div>
    </>
  )
}

export default WallCreative
