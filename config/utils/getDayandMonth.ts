const MONTH = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

const getDayandMonth = (date: string) => {
  const d = new Date(date)
  const day = d.getDate()
  const month = d.getMonth()
  return { day, month }
}

export const getDateToStringWithCurrentYear = (date: string) => {
  const { day, month } = getDayandMonth(date)
  const CURRENT_YEAR = new Date().getFullYear()
  return new Date(`${CURRENT_YEAR}-${month + 1}-${day + 1}`).toDateString()
}

export const getDayandMonthName = (date: string) => {
  const d = new Date(date)
  const day = d.getUTCDate()
  const month = d.getUTCMonth()
  return `${day} de ${MONTH[month]}`
}

export const diffDaysToNow = (date: string) => {
  const d = new Date(date)
  const now = new Date()

  const diff = d.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 3600 * 24))
}
