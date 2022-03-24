import { ICreative } from 'models/Creative.model'
import useSWR from 'swr'

const useCreative = (id: string) => {
  const { data, error, mutate } = useSWR<ICreative>(`/api/creative/${id}`)

  return {
    creative: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export default useCreative
