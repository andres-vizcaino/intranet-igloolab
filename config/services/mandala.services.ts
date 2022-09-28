import axios from 'axios'

export const postNewMandala = (name: string, photo: string, ownerId: string) =>
  axios.post('/api/mandala/create', {
    name,
    photo,
    ownerId,
  })

export const deleteMandala = (id: string) => axios.delete(`/api/mandala/${id}`)

export const likeMandala = async (id: string, userId: string | undefined) => {
  await axios.post(`/api/mandala/${id}`, { userId })
}

export const unlikeMandala = async (id: string, userId: string | undefined) => {
  await axios.put(`/api/mandala/${id}`, { userId })
}
