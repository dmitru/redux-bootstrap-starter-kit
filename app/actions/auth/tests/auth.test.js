import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import _ from 'lodash'
import { login, logout } from '../auth'
import { expect, mockApi } from '../../../utils/testUtils'

import authLoggedInStub from './stubs/authLoggedIn.stub.json'
import authErrorWrongCredentialsStub from './stubs/authErrorWrongCredentials.stub.json'

import * as constants from '../../../constants'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    mockApi.reset()
  })

  it('creates AUTH_LOGGED_IN when successfully signed in', (done) => {
    mockApi.onPost('/api/login')
      .replyOnce(authLoggedInStub.status, authLoggedInStub.body)

    const expectedActions = [
      { type: constants.AUTH_LOGIN_REQUEST },
      { type: constants.AUTH_LOGGED_IN, payload: { token: 'a-token-string' } },
    ]
    const store = mockStore({})

    return store.dispatch(login({ email: 'test@user.com', password: 'email' }))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
        done()
      })
  })

  it('creates AUTH_LOGIN_ERROR when cannot sign in (server error)', (done) => {
    mockApi.onPost('/api/login')
      .replyOnce(500)

    const expectedActions = [
      { type: constants.AUTH_LOGIN_REQUEST },
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
        done()
      })
  })

  it('creates AUTH_LOGIN_ERROR when cannot sign in (wrong credentials)', (done) => {
    mockApi.onPost('/api/login')
      .replyOnce(authErrorWrongCredentialsStub.status, authErrorWrongCredentialsStub.body)

    const expectedActions = [
      { type: constants.AUTH_LOGIN_REQUEST },
      { type: constants.AUTH_LOGIN_ERROR,
        payload: {
          errorCode: 'WRONG_CREDENTIALS',
          status: authErrorWrongCredentialsStub.status,
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

  it('creates AUTH_LOGGED_OUT when logged out', () => {
    const expectedAction = { type: constants.AUTH_LOGGED_OUT }
    expect(logout()).to.deep.equal(expectedAction)
  })
})
