import axios from 'axios'

export const createCongrat = async (
  message: string,
  typeCongrat: string,
  authorId: string,
  fromId: string,
  isAnonymous: boolean
) =>
  await axios.post('/api/congrat/create', {
    message,
    typeCongrat,
    authorId,
    fromId,
    isAnonymous,
  })

export const deleteCongrat = async (id: string) =>
  await axios.delete(`/api/congrat/delete/${id}`)
