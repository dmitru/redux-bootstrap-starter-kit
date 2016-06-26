
import client from '../utils/apiClient'

export const get = () => (
  client.get('/api/Currencies')
)
