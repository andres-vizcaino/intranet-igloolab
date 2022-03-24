import axios from 'axios'

export const createCreative = async (
  title: string,
  content: string,
  categoryId: string,
  authorId: string,
  image: string
) =>
  await axios.post('/api/creative/create', {
    title,
    content,
    categoryId,
    authorId,
    image,
  })

export const deleteCreative = async (id: string) =>
  await axios.delete(`/api/creative/${id}`)
