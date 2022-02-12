import axios from 'axios'
import { API_CLOUDINARY_GET, API_CLOUDINARY_URL } from 'config/constants/URLs'

export const uploadFileReturnName = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'open-igloolab')

  const response = await axios.post(API_CLOUDINARY_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data.secure_url.replace(API_CLOUDINARY_GET, '')
}
