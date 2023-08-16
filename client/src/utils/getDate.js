export const getTime = (createdAtDate) => {
  const createdAt = new Date(createdAtDate).getTime()
  const diff = Date.now() - createdAt
  if (diff <= 60 * 1000)
    return '1 минуту назад'
  if (diff <= 5 * 60 * 1000)
    return '5 минут назад'
  if (diff <= 10 * 60 * 1000)
    return '10 минут назад'
  if (diff <= 30 * 60 * 1000)
    return '30 минут назад'

  const date = new Date(createdAt)

  if (diff <= 24 * 60 * 60 * 1000)
    return `${date.getHours()}.${date.getMinutes()}`

  if (diff <= 365 * 24 * 60 * 60 * 1000)
    return date.toLocaleString('default', { month: 'long', day: 'numeric' })

  return date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })
}