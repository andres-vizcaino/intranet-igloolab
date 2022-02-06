import { Todo } from 'data/todo.data'
import { Draggable } from 'react-beautiful-dnd'
import TaskInformation from './TaskInformation'

type Props = {
  item: Todo
  index: number
  deleteTask: (colunmID: string, taskID: string) => void
  columnId: string
}

const TaskCard = ({ item, index, deleteTask, columnId }: Props) => (
  <Draggable draggableId={item.id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <TaskInformation>
          <p>{item.Task}</p>
          <div className="secondary-details">
            <p>
              <span>
                {new Date(item.Due_Date).toLocaleDateString('en-es', {
                  month: 'short',
                  day: '2-digit',
                })}
              </span>
            </p>
          </div>
        </TaskInformation>
        <button
          onClick={() => deleteTask(columnId, item.id)}
          className="bg-red-600 p-2 text-white text-sm rounded-lg"
        >
          Eliminar tarea
        </button>
      </div>
    )}
  </Draggable>
)

export default TaskCard
