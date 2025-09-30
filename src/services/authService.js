import authApi from './authApi'

export const login = async (email, password) => {
  const res = await authApi.post('/api/auth/login', { email, password })
  const token = res.data.accessToken
  localStorage.setItem('spedu_token', token)
  localStorage.setItem('loggedInUser', res.data.name)
  localStorage.setItem('userRole', res.data.role)
  localStorage.setItem('loginAt', res.data.loginAt)
  return res.data
}

export const register = async (payload) => {
  return authApi.post('/api/auth/register', payload)
}

export const logout = () => {
  localStorage.removeItem('spedu_token')
  window.location.href = '/login'
}
