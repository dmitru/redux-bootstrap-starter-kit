import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import _ from 'lodash'
import { login } from '../auth'
import chai from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import * as constants from '../../constants'

chai.config.truncateThreshold = 0
const expect = chai.expect

const mockApi = new MockAdapter(axios)

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    mockApi.reset()
  })

  it('creates AUTH_LOGGED_IN when successfully signed in', () => {
    mockApi.onPost('/api/login')
      .replyOnce(200, { token: 'a-token-string' })

    const expectedActions = [
      { type: constants.AUTH_REQUEST },
      { type: constants.AUTH_LOGGED_IN, payload: { token: 'a-token-string' } },
    ]
    const store = mockStore({})

    return store.dispatch(login({ email: 'test@user.com', password: 'email' }))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })

  it('creates AUTH_LOGIN_ERROR when cannot sign in (server error)', () => {
    mockApi.onPost('/api/login')
      .replyOnce(500)

    const expectedActions = [
      { type: constants.AUTH_REQUEST },
      { type: constants.AUTH_LOGIN_ERROR,
        payload: {
          errorCode: constants.ERROR_SERVER,
          status: 500,
          message: 'Server error',
        },
      },
    ]
    const store = mockStore({})

    return store.dispatch(login({ email: 'test@user.com', password: 'email' }))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })

  it('creates AUTH_LOGIN_ERROR when cannot sign in (wrong credentials)', (done) => {
    mockApi.onPost('/api/login')
      .replyOnce(402, { errorCode: 'WRONG_CREDENTIALS' })

    const expectedActions = [
      { type: constants.AUTH_REQUEST },
      { type: constants.AUTH_LOGIN_ERROR,
        payload: {
          errorCode: 'WRONG_CREDENTIALS',
          status: 402,
        },
      },
    ]
    const store = mockStore({})

    store.dispatch(login({ email: 'test@user.com', password: 'email' }))
      .then(() => {
        const actions = store.getActions()
        expect(actions).to.have.lengthOf(2)
        actions[1].payload = _.omit(actions[1].payload, 'message')
        expect(actions).to.deep.equal(expectedActions)
        done()
      })
  })
})
