import { IItemsColumn } from 'models/Board.model'
import { Draggable } from 'react-beautiful-dnd'
import TaskInformation from './TaskInformation'

type Props = {
  item: IItemsColumn
  index: number
}

const TaskCard = ({ item, index }: Props) => (
  <Draggable draggableId={item.id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <TaskInformation>
          <p>{item.description}</p>
          <div className="secondary-details">
            <p>
              <span>
                {new Date(item.createdAt).toLocaleDateString('en-es', {
                  month: 'short',
                  day: '2-digit',
                })}
              </span>
            </p>
          </div>
        </TaskInformation>
        <button className="bg-red-600 p-2 text-white text-sm rounded-lg">
          Eliminar tarea
        </button>
      </div>
    )}
  </Draggable>
)

export default TaskCard
