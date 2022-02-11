export interface Todo {
  id: string
  Task: string
  Due_Date: string
}

export const data: Todo[] = [
  {
    id: '1',
    Task: 'Create PR for the Task',
    Due_Date: '25-May-2021',
  },
  {
    id: '2',
    Task: 'Fix Styling',
    Due_Date: '26-May-2021',
  },
  {
    id: '3',
    Task: 'Handle Api Changes',
    Due_Date: '27-May-2021',
  },
  {
    id: '4',
    Task: 'Blog on new features',
    Due_Date: '23-Aug-2021',
  },
  {
    id: '5',
    Task: 'Call with Backend Team',
    Due_Date: '05-Jan-2021',
  },
]

export interface ColumnTodo {
  [key: string]: {
    title: string
    items: Todo[]
  }
}

export const columnsFromBackend: ColumnTodo = {
  ['1']: {
    title: 'To-do',
    items: data,
  },
  ['2']: {
    title: 'In Progress',
    items: [],
  },
  ['3']: {
    title: 'Done',
    items: [],
  },
}
