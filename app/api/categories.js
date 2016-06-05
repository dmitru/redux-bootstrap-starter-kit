
import ajax from 'axios'

export const getAll = ({ token }) => (
  ajax.get('/api/categories', {
    params: { token },
  })
)
