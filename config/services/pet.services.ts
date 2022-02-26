import axios from 'axios'

export const postNewPet = (name: string, photo: string, ownerId: string) =>
  axios.post('/api/pets/create', {
    name,
    photo,
    ownerId,
  })

export const deletePet = (id: string) => axios.delete(`/api/pets/${id}`)

export const likePet = async (id: string, userId: string | undefined) => {
  await axios.post(`/api/pets/${id}`, { userId })
}

export const unlikePet = async (id: string, userId: string | undefined) => {
  await axios.put(`/api/pets/${id}`, { userId })
}
