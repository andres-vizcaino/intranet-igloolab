const DATE_UNITS = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
}

const getSecondsDiff = (timestamp: number) => (Date.now() - timestamp) / 1000
const getUnitAndValueDate = (secondsElapsed: number) => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === 'second') {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1
      return { value, unit }
    }
  }
}

const dateToTimestamp = (date: Date) => new Date(date).getTime()

type TGetTimeAgo = {
  value: number
  unit: string
}

export const getTimeAgo = (date: Date) => {
  const timestamp = dateToTimestamp(date)
  const rtf = new Intl.RelativeTimeFormat()

  const secondsElapsed = getSecondsDiff(timestamp)
  const value: TGetTimeAgo | undefined = getUnitAndValueDate(secondsElapsed)

  if (value)
    return rtf.format(value.value, value.unit as Intl.RelativeTimeFormatUnit)
  else return 'now'
}
