export const getStringToDate = (date: string) =>
  new Date(date).toUTCString().split('T')[0]
