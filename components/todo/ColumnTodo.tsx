import { IColumn, IItemsColumn } from 'models/Board.model'
import { Dispatch, SetStateAction, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { createItemColumn, editColumn } from 'services/todo.services'
import TaskCard from './TaskCard'

type Props = {
  id: string | undefined
  title: string | undefined
  items: IItemsColumn[]
  deleteOneColumn: (id: string) => void
  deleteItem: (id: string, boardId: string) => void
  setColumns: Dispatch<SetStateAction<IColumn[]>>
  columns: IColumn[]
}

const ColumnTodo = ({
  id,
  items,
  title,
  deleteOneColumn,
  deleteItem,
  setColumns,
  columns,
}: Props) => {
  const [isEditTitleColumn, setIsEditTitleColumn] = useState(false)
  const [titleColumn, setTitleColumn] = useState(title)
  const [newTaskInput, setNewTaskInput] = useState('')

  const editTitleColumn = async (id: string) => {
    await editColumn(id, titleColumn || '')

    setIsEditTitleColumn(false)
  }

  const addTask = async () => {
    if (newTaskInput === '') return

    const newTask = await createItemColumn(newTaskInput, id || '')

    setNewTaskInput('')

    setColumns([
      ...columns.filter((column) => column.id !== id),
      {
        ...columns.find((column) => column.id === id),
        items: [...items, newTask],
      },
    ])
  }

  return (
    <Droppable key={id} droppableId={id || ''}>
      {(provided) => (
        <div
          className="h-full flex flex-col bg-emerald-500  rounded-md p-4 mr-11"
          style={{ width: '300px' }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="flex-1">
            <div className="flex justify-between">
              {isEditTitleColumn ? (
                <>
                  <input
                    type="text"
                    value={titleColumn}
                    onChange={(e) => setTitleColumn(e.target.value)}
                  />
                  <button onClick={() => editTitleColumn(id || '')}>✅</button>
                </>
              ) : (
                <>
                  <span className="text-green-700 bg-lime-100 py-1 px-3 rounded-sm self-start">
                    {titleColumn}
                  </span>
                  <div className="inline-flex gap-5">
                    <button onClick={() => setIsEditTitleColumn(true)}>
                      ✏️
                    </button>
                  </div>
                </>
              )}
            </div>
            {items?.map((item, index) => (
              <TaskCard
                key={item.id}
                item={item}
                index={index}
                deleteItem={deleteItem}
              />
            ))}
            {provided.placeholder}
          </div>
          <div className="flex justify-between mt-10 gap-4">
            <input
              type="text"
              placeholder="Agregar tarea"
              className="w-full p-2 bg-gray-200 rounded-md dark:text-black"
              value={newTaskInput}
              onChange={(e) => setNewTaskInput(e.target.value)}
            />
            <button onClick={addTask}>➕</button>
          </div>
          <button
            className="mt-10 bg-red-500 text-white rounded-lg"
            onClick={() => deleteOneColumn(id || '')}
          >
            Eliminar
          </button>
        </div>
      )}
    </Droppable>
  )
}

export default ColumnTodo
