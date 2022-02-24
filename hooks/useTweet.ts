import { ITweet } from 'models/Tweet.model'
import useSWR from 'swr'

const usePost = (id: string) => {
  const { data, error, mutate } = useSWR<ITweet>(`/api/tweet/${id}`)

  return {
    tweet: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export default usePost
