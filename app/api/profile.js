
import ajax from 'axios'

export const getProfile = ({ token }) => (
  ajax.get('/api/profile', {
    params: { token },
  })
)
