import axios from 'axios'

export const createBoard = async (
  name: string,
  description: string,
  authorId: string
) => {
  const response = await axios.post('/api/todo/create-board', {
    name,
    description,
    authorId,
  })

  return response
}

export const deleteBoard = async (id: string) => {
  const response = await axios.delete(`/api/todo/${id}`)

  return response
}

export const createColumn = async (title: string, boardId: string) => {
  const response = await axios.post('/api/todo/create-column', {
    title,
    boardId,
  })

  return response.data
}

export const editColumn = async (id: string, title: string) => {
  const response = await axios.put(`/api/todo/column/${id}`, {
    title,
  })

  return response
}

export const deleteColumn = async (id: string) => {
  const response = await axios.delete(`/api/todo/column/${id}`)

  return response
}

export const editItemColumn = async (id: string, columnBoardId: string) => {
  const response = await axios.put(`/api/todo/item/${id}`, {
    columnBoardId,
  })

  return response
}

export const deleteItemColumn = async (id: string) => {
  const response = await axios.delete(`/api/todo/item/${id}`)

  return response
}

export const createItemColumn = async (
  description: string,
  columnBoardId: string
) => {
  const response = await axios.post('/api/todo/create-item', {
    description,
    columnBoardId,
  })

  return response.data
}
