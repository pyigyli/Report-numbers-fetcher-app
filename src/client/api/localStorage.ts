interface Entry {
  key: string,
  value: string
}

export const setCookies = (...entries: Entry[]) => {
  entries.forEach((entry: Entry) => {
    const {key, value} = entry
    localStorage.setItem(key, value)
  })
}

export const getCookies = (...keys: string[]): string[] => {
  const cookies: string[] = []
  keys.forEach((key: string) => {
    const cookie = localStorage.getItem(key)
    if (cookie) {
      cookies.push(cookie)
    }
  })
  return cookies
}

export const clearCookies = () => {
  localStorage.clear()
}
