
import client from '../utils/apiClient'

export const login = ({ email, password }) => (
  client.post('/auth/login').send({ email, password })
)

export const signup = ({ email, password, captchaResponse }) => (
  client.post('/auth/signup').send({ email, password, captchaResponse })
)
