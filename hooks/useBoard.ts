import { IBoard } from 'models/Board.model'
import useSWR from 'swr'

const useBoard = (id: string) => {
  const { data, error, mutate } = useSWR<IBoard>(`/api/todo/${id}`)

  return {
    board: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export default useBoard
