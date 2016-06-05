
import ajax from 'axios'

export const login = ({ email, password }) => (
  ajax.post('/api/login', { email, password })
)
