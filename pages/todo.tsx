import TaskCard from 'components/todo/TaskCard'
import { columnsFromBackend, ColumnTodo, Todo } from 'data/todo.data'
import { NextPage } from 'next'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'

const TodoPage: NextPage = () => {
  const [columns, setColumns] = useState<ColumnTodo>(columnsFromBackend)
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(process.browser)
  }, [])

  const onDragEnd = (
    result: DropResult,
    columns: ColumnTodo,
    setColumns: Dispatch<SetStateAction<ColumnTodo>>
  ) => {
    if (!result.destination) return
    const { source, destination } = result
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId]
      const destColumn = columns[destination.droppableId]
      const sourceItems = [...sourceColumn.items]
      const destItems = [...destColumn.items]
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      })
    } else {
      const column = columns[source.droppableId]
      const copiedItems = [...column.items]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      })
    }
  }

  const addColunm = () => {
    const newColumns = {
      ...columns,
      [`column-${Date.now()}`]: {
        id: `column-${Date.now()}`,
        title: 'New Column',
        items: [],
      },
    }
    setColumns(newColumns)
  }

  const addTask = (columnId: string) => {
    const newColumns = {
      ...columns,
      [columnId]: {
        ...columns[columnId],
        items: [
          ...columns[columnId].items,
          {
            id: `task-${Date.now()}`,
            Task: 'New Task',
            Due_Date: new Date(Date.now()).toISOString(),
          },
        ],
      },
    }
    setColumns(newColumns)
  }

  const deleteTask = (columnId: string, taskId: string) => {
    const newColumns = {
      ...columns,
      [columnId]: {
        ...columns[columnId],
        items: columns[columnId].items.filter(
          (item: Todo) => item.id !== taskId
        ),
      },
    }
    setColumns(newColumns)
  }

  return (
    <div className="overflow-auto min-h-screen">
      {isBrowser ? (
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          <div className="flex">
            <div className="m-2 flex w-full min-h-min">
              {Object.entries(columns).map(([columnId, column]) => (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided) => (
                    <div
                      className="min-h-full flex flex-col bg-gray-500 w-96 rounded-md p-4 mr-11"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <span className="text-green-700 bg-lime-100 py-1 px-3 rounded-sm self-start">
                        {column.title}
                      </span>
                      {column.items.map((item, index) => (
                        <TaskCard
                          key={item.id}
                          item={item}
                          index={index}
                          columnId={columnId}
                          deleteTask={deleteTask}
                        />
                      ))}
                      {provided.placeholder}
                      <button
                        onClick={() => addTask(columnId)}
                        className="mt-10 p-3 bg-amber-500 rounded-3xl"
                      >
                        agregar tarea
                      </button>
                    </div>
                  )}
                </Droppable>
              ))}

              <button
                onClick={addColunm}
                className="p-3 bg-slate-700 text-white rounded-xl"
              >
                agregar tablero
              </button>
            </div>
          </div>
        </DragDropContext>
      ) : null}
    </div>
  )
}

export default TodoPage
