
import client from '../utils/apiClient'

export const login = ({ email, password }) => (
  client.post('/api/login', { email, password })
)
