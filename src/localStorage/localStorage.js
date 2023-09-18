export const loadLocalStorage = (key) => {
  const item = localStorage.getItem(key)

  if (item) {
    return JSON.parse(item)
  }

  return null
}

export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const clearLocalStorage = (key) => {
  localStorage.removeItem(key)
}
