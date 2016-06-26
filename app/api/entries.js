
import client from '../utils/apiClient'

export const getAll = () => (
  client.get('/api/Entries')
)

export const create = ({ entry }) => (
  client.post('/api/Entries').send(entry)
)

export const update = ({ entry }) => (
  client.put(`/api/Entries/${entry.id}`).send(entry)
)

export const del = ({ ids }) => {
  if (Array.isArray(ids)) {
    return client.delete('/api/Entries').send({ ids })
  }
  return client.delete(`/api/Entries/${ids}`)
}
