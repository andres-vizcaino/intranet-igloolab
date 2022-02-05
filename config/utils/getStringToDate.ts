export const getStringToDate = (date: string) =>
    new Date(date).toISOString().split('T')[0]
