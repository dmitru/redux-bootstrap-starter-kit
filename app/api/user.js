import superagent from 'superagent'
import superagentPromisePlugin from 'superagent-promise-plugin'
const request = superagentPromisePlugin.patch(superagent)

export const login = ({ email, password }) => (
  request
    .post('/api/login')
    .send({ email, password })
)
