import axios from 'axios'

export const deleteTweet = async (id: number) => {
  await axios.delete(`/api/tweet/${id}`)
}

export const createTweet = async ({ body, userId, image = '' }: { body: string, userId: string, image: string }): Promise<void> => {
  await axios.post('/api/tweet/create', { body, userId, image })
}

export const likeTweet = async (id: number, userId: string | undefined) => {
  await axios.post(`/api/tweet/like/${id}`, { userId })
}

export const unlikeTweet = async (id: number, userId: string | undefined) => {
  await axios.put(`/api/tweet/like/${id}`, { userId })
}

export const createComment = async (
  body: string,
  userId: string,
  tweetId: string
) => {
  await axios.post('/api/tweet/comment/create', { body, userId, tweetId })
}

export const deleteComemnt = async (id: number) => {
  await axios.delete(`/api/tweet/comment/${id}`)
}
