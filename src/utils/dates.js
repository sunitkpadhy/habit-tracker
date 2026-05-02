export function dateKey(d) {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function todayKey() {
  return dateKey(new Date())
}

export function addDays(key, delta) {
  const [y, m, d] = key.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + delta)
  return dateKey(date)
}

export function lastNDays(n) {
  const out = []
  for (let i = n - 1; i >= 0; i--) {
    out.push(addDays(todayKey(), -i))
  }
  return out
}

export function shortLabel(key) {
  const [y, m, d] = key.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString(undefined, { weekday: 'short' })
}
