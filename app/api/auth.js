
import client from '../utils/apiClient'

export const login = ({ email, password }) => (
  client.post('/api/login', { email, password })
)

export const signup = ({ email, password, captchaResponse }) => (
  client.post('/api/signup', { email, password, captchaResponse })
)
