// api.js
const BASE_URL = 'http://localhost:3000'

export const apiRequest = async (endpoint, method = 'GET', body = null) => {
  const token = localStorage.getItem('token')

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...(body && { body: JSON.stringify(body) })
  })

  const contentType = res.headers.get('content-type')

  if (!contentType || !contentType.includes('application/json')) {
    const text = await res.text()
    throw new Error(`Not JSON response: ${text.substring(0, 100)}`)
  }

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Error')
  }

  return data
}