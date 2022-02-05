import { User } from '@prisma/client'

export const getNamesFromArray = (
  array: User[],
  userId: string | undefined
) => {
  const names = array
    .filter((user) => userId !== user.id)
    .map((user) => user.name)
  return names.join(', ')
}
