import axios from 'axios'

export const postNewContent = (
  name: string,
  photo: string,
  ownerId: string,
  description: string,
  typeContent: string
) =>
  axios.post('/api/content/create', {
    name,
    photo,
    ownerId,
    description,
    typeContent,
  })

export const deleteContent = (id: string) => axios.delete(`/api/content/${id}`)

export const likeContent = async (id: string, userId: string | undefined) => {
  await axios.post(`/api/content/${id}`, { userId })
}

export const unlikeContent = async (id: string, userId: string | undefined) => {
  await axios.put(`/api/content/${id}`, { userId })
}
