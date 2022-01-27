import axios from 'axios'

export const deleteTweet = async (id: number) => {
  await axios.delete(`/api/tweet/${id}`)
}

export const createTweet = async (body: string, userId: string) => {
  await axios.post('/api/tweet/create', { body, userId })
}
