import axios from 'axios'

export const createProfile = async (idUser: string | undefined, bio: string) =>
  await axios.post('/api/user/createProfile', {
    idUser,
    bio,
  })
