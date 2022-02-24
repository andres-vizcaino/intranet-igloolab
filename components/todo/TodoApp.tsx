import { IColumn } from 'models/Board.model'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { DropResult, DragDropContext } from 'react-beautiful-dnd'
import {
  createColumn,
  deleteColumn,
  deleteItemColumn,
  editItemColumn,
} from 'services/todo.services'
import ColumnTodo from './ColumnTodo'

type Props = {
  boardId: string | undefined
  columnsBoard: IColumn[]
}

const TodoApp = ({ columnsBoard, boardId }: Props) => {
  const [columns, setColumns] = useState<IColumn[]>(columnsBoard)
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(process.browser)
  }, [])

  const onDragEnd = async (
    result: DropResult,
    columns: IColumn[],
    setColumns: Dispatch<SetStateAction<IColumn[]>>
  ) => {
    if (!result.destination) return
    const { source, destination } = result
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.find(
        (column) => source.droppableId === column.id
      )

      const destColumn = columns.find(
        (column) => destination.droppableId === column.id
      )
      const sourceItems = [...(sourceColumn?.items || [])]
      const destItems = [...(destColumn?.items || [])]

      const [removed] = sourceItems.splice(source.index, 1)

      destItems.splice(destination.index, 0, removed)

      setColumns([
        ...columns.filter(
          (column) =>
            column.id !== source.droppableId &&
            column.id !== destination.droppableId
        ),
        {
          ...sourceColumn,
          items: sourceItems,
        },
        {
          ...destColumn,
          items: destItems,
        },
      ])

      await editItemColumn(removed.id, destColumn?.id || '')
    } else {
      const column = columns.find((column) => source.droppableId === column.id)
      const copiedItems = [...(column?.items || [])]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      setColumns([
        ...columns.filter((column) => column.id !== source.droppableId),
        {
          ...column,
          items: copiedItems,
        },
      ])
    }
  }

  const addNewColumn = async () => {
    const newColumn = await createColumn('Nueva columna', boardId || '')
    setColumns([...columns, newColumn])
  }

  const deleteOneColumn = async (id: string) => {
    await deleteColumn(id)
    setColumns(columns.filter((column) => column.id !== id))
  }

  const deleteItem = async (id: string, columnId: string) => {
    await deleteItemColumn(id)

    setColumns(
      columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            items: column.items?.filter((item) => item.id !== id),
          }
        }
        return column
      })
    )
  }

  return (
    <div className="overflow-x-scroll scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 dark:scrollbar-track-gray-900 dark:scrollbar-thumb-gray-100 min-h-min">
      {isBrowser ? (
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          <div className="flex">
            <div className="m-2 flex mb-11 min-h-min items-baseline">
              {/* FIXME: ENCONTRAR LA FORMA DE QUE ESTO NO DEBA ORDENARLO POR FECHA, SI NO QUE LAS POSISIONES DE CADA TABLERO NO CAMBIE */}
              {columns
                .sort(function (a, b) {
                  return (
                    new Date(a.createdAt || '').getTime() -
                    new Date(b.createdAt || '').getTime()
                  )
                })
                .map(({ id, items, title }) => (
                  <ColumnTodo
                    key={id}
                    id={id}
                    title={title}
                    items={items || []}
                    deleteOneColumn={deleteOneColumn}
                    deleteItem={deleteItem}
                    setColumns={setColumns}
                    columns={columns}
                  />
                ))}

              <button
                onClick={addNewColumn}
                disabled={columns.length >= 5}
                className="p-3 bg-slate-700 text-white rounded-xl disabled:bg-slate-400"
              >
                {columns.length >= 5
                  ? 'No puedes agregar más columnas 🥲'
                  : 'Agregar columna'}
              </button>
            </div>
          </div>
        </DragDropContext>
      ) : null}
    </div>
  )
}

export default TodoApp
