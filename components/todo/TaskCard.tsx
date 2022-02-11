import { IItemsColumn } from 'models/Board.model'
import { Draggable } from 'react-beautiful-dnd'
import TaskInformation from './TaskInformation'

type Props = {
  item: IItemsColumn
  index: number
  deleteItem: (id: string, boardId: string) => void
}

const TaskCard = ({ item, index, deleteItem }: Props) => (
  <Draggable draggableId={item.id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <TaskInformation>
          <p>{item.description}</p>
          <div className="text-sm">
            <p>
              <span className="text-gray-500">
                {new Date(item.createdAt).toLocaleDateString('en-es', {
                  month: 'short',
                  day: '2-digit',
                })}
              </span>
            </p>
          </div>
          <button
            className="absolute right-4"
            onClick={() => deleteItem(item.id, item.columnBoardId)}
          >
            ❌
          </button>
        </TaskInformation>
      </div>
    )}
  </Draggable>
)

export default TaskCard
