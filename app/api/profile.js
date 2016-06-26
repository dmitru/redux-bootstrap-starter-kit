
import client from '../utils/apiClient'

export const getProfile = ({ token }) => (
  client.get('/auth/profile').set('Authorization', token)
)
