import chai from 'chai'
chai.config.truncateThreshold = 0
export const expect = chai.expect

import client from './apiClient'
import MockAdapter from 'axios-mock-adapter'
export const mockApi = new MockAdapter(client)
