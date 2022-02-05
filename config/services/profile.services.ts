import axios from 'axios'

export const createProfile = async (
    idUser: string | undefined,
    bio: string,
    birthday: string
) =>
    await axios.post('/api/users/createProfile', {
        idUser,
        bio,
        birthday,
    })

export const updateProfile = async (
    idUser: string | undefined,
    bio: string,
    birthday: string
) =>
    await axios.put('/api/users/updateProfile', {
        idUser,
        bio,
        birthday,
    })
