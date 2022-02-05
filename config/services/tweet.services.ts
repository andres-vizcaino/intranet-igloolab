import axios from 'axios'

export const deleteTweet = async (id: number) => {
  await axios.delete(`/api/tweet/${id}`)
}

export const createTweet = async (body: string, userId: string) => {
  await axios.post('/api/tweet/create', { body, userId })
}

export const likeTweet = async (id: number, userId: string | undefined) => {
  await axios.post(`/api/tweet/like/${id}`, { userId })
}

export const unlikeTweet = async (id: number, userId: string | undefined) => {
  await axios.put(`/api/tweet/like/${id}`, { userId })
}
