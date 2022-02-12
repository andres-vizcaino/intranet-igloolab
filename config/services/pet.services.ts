import axios from 'axios'

export const postNewPet = (name: string, photo: string, ownerId: string) =>
  axios.post('/api/pets/create', {
    name,
    photo,
    ownerId,
  })

export const deletePet = (id: string) => axios.delete(`/api/pets/${id}`)
