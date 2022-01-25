import axios from 'axios'

export const createProfile = async (idUser: string | undefined, bio: string) =>
  await axios.post('/api/users/createProfile', {
    idUser,
    bio,
  })

export const updateProfile = async (idUser: string | undefined, bio: string) =>
  await axios.put('/api/users/updateProfile', {
    idUser,
    bio,
  })
