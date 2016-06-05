
import ajax from 'axios'

export const getAll = ({ token }) => (
  ajax.get('/api/entries', {
    params: { token },
  })
)
