import { IUser } from 'models/User.model'
import useSWR from 'swr'

const useUser = (id: string) => {
  const { data, error, mutate } = useSWR<IUser>(`/api/users/${id}`)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export default useUser
