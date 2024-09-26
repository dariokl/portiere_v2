export const getFirstDayOfNextMonth = () => {
  const today = new Date()
  const firstDayNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
  return firstDayNextMonth
}
