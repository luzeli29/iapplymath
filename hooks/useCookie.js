import { useState } from 'react'

function useCookie(cookieName) {
  const getCookie = () => {
    const cookie = document.cookie.split('; ')
      .find(row => row.startsWith(cookieName))

    if (cookie) {
      const cookieValue = decodeURIComponent(cookie.split('=')[1])
      try {
        return JSON.parse(cookieValue)
      } catch (error) {
        return cookieValue
      }
    }
    return null
  }

  const [cookie, setCookieState] = useState(getCookie())

  const setCookie = (value, days) => {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    const cookieValue = typeof value === 'object' ? JSON.stringify(value) : value
    document.cookie = `${cookieName}=${encodeURIComponent(cookieValue)}; expires=${date.toUTCString()}; path=/`

    setCookieState(value)
  }

  const deleteCookie = () => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`

    setCookieState(null)
  }

  return [cookie, setCookie, deleteCookie]
}

export default useCookie