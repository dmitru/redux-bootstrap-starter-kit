
import client from '../utils/apiClient'

export const getAll = () => (
  client.get('/api/Categories')
)

export const create = ({ category }) => (
  client.post('/api/Categories').send(category)
)

export const update = ({ category }) => (
  client.put(`/api/Categories/${category.id}`).send(category)
)

export const del = ({ ids }) => {
  if (Array.isArray(ids)) {
    return client.delete('/api/Categories').send({ ids })
  }
  return client.delete(`/api/Categories/${ids}`)
}
