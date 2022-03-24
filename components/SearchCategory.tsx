import { Category } from '@prisma/client'
import { useState } from 'react'
import { createCategory } from 'services/category.services'
import useSWR from 'swr'

type TProps = {
  categoryId: string
  setCategoryId: (categoryId: string) => void
}

const SearchCategory = ({ categoryId, setCategoryId }: TProps) => {
  const { data, error, mutate } = useSWR<Category[]>('/api/category')
  const [createNewCategory, setCreateNewCategory] = useState(false)
  const [newCategory, setNewCategory] = useState('')

  const toggleCreateNewCategory = () => {
    setCreateNewCategory(!createNewCategory)
  }

  const handleSelect = (categoryId: string) => {
    setCategoryId(categoryId)
  }

  const saveNewCategory = async () => {
    if (newCategory.length > 0) {
      await createCategory(newCategory)
      mutate()
      setNewCategory('')
      setCreateNewCategory(false)
    }
  }

  return (
    <div className="flex gap-5 items-center">
      {error && <div>failed to load</div>}
      {!data && <div>Cargando todas las categorias.</div>}
      {!createNewCategory && (
        <select
          value={categoryId}
          onChange={({ target }) => handleSelect(target.value)}
          className="block w-auto px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
        >
          {data?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      )}
      {createNewCategory && (
        <div className="flex items-center">
          <input
            className="block w-auto px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
            type="text"
            placeholder="Nueva categoria"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            className="disabled:bg-slate-500 ml-2 px-4 py-2 rounded-md text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-indigo-600 border-0 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
            onClick={saveNewCategory}
            disabled={newCategory.length === 0}
          >
            Crear
          </button>
        </div>
      )}
      <button
        onClick={toggleCreateNewCategory}
        className="w-auto bg-blue-200 hover:bg-blue-700 hover:text-white text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {createNewCategory ? 'Cancelar' : 'Nueva categoria'}
      </button>
    </div>
  )
}

export default SearchCategory
