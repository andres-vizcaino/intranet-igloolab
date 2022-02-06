import { IColumn } from 'models/Board.model'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { DropResult, DragDropContext, Droppable } from 'react-beautiful-dnd'
import TaskCard from './TaskCard'

type Props = {
  columnsBoard: IColumn[]
}

const TodoApp = ({ columnsBoard }: Props) => {
  const [columns, setColumns] = useState<IColumn[]>(columnsBoard)
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(process.browser)
  }, [])

  const onDragEnd = (
    result: DropResult,
    columns: IColumn[],
    setColumns: Dispatch<SetStateAction<IColumn[]>>
  ) => {
    if (!result.destination) return
    const { source, destination } = result
    if (source.droppableId !== destination.droppableId) {
      console.log('destination.droppableId: ' + destination.droppableId)
      console.log('source.droppableId: ' + source.droppableId)

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

  return (
    <div className="overflow-x-scroll min-h-min">
      {isBrowser ? (
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          <div className="flex">
            <div className="m-2 flex w-full min-h-min">
              {/* FIXME: ENCONTRAR LA FORMA DE QUE ESTO NO DEBA ORDENARLO POR FECHA, SI NO QUE LAS POSISIONES DE CADA TABLERO NO CAMBIE */}
              {columns
                .sort(function (a, b) {
                  return (
                    new Date(a.createdAt || '').getTime() -
                    new Date(b.createdAt || '').getTime()
                  )
                })
                .map(({ id, items, title }) => (
                  <Droppable key={id} droppableId={id || ''}>
                    {(provided) => (
                      <div
                        className="min-h-full flex flex-col bg-gray-500 w-96 min-w-fit  rounded-md p-4 mr-11"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <span className="text-green-700 bg-lime-100 py-1 px-3 rounded-sm self-start">
                          {title}
                        </span>
                        {items.map((item, index) => (
                          <TaskCard key={item.id} item={item} index={index} />
                        ))}
                        {provided.placeholder}
                        <button className="mt-10 p-3 bg-amber-500 rounded-3xl">
                          agregar tarea
                        </button>
                      </div>
                    )}
                  </Droppable>
                ))}

              <button className="p-3 bg-slate-700 text-white rounded-xl">
                agregar tablero
              </button>
            </div>
          </div>
        </DragDropContext>
      ) : null}
    </div>
  )
}

export default TodoApp
