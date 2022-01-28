import { IPost } from 'models/Post.model'
import useSWR from 'swr'

const usePost = (slug: string) => {
  const { data, error, mutate } = useSWR<IPost>(`/api/posts/${slug}`)

  return {
    post: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export default usePost
