import axios from 'axios'

export const createCategory = async (name: string) =>
  await axios.post('/api/category/create', {
    name,
  })
