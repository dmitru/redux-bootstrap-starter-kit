const express = require('express')
const router = express.Router()

const TOKEN_ID = 'a-secret-token-string'
const USER = {
  email: 'test@user.com',
}

/*
 * This is an API stub meant only for testing the frontend app
 */

router.get('/categories', (req, res) => {
  setTimeout(() => {
    // TODO: refactor this check of credentials
    if (req.param('token', '') !== TOKEN_ID) {
      res.status(401).json({ errorCode: 'WRONG_CREDENTIALS', message: 'Wrong username or password.' })
    } else {
      res.json([
        { name: 'Food' },
        { name: 'Entertainment' },
      ])
    }
  }, 800)
})

router.get('/entries', (req, res) => {
  setTimeout(() => {
    // TODO: refactor this check of credentials
    if (req.param('token', '') !== TOKEN_ID) {
      res.status(401).json({ errorCode: 'WRONG_CREDENTIALS', message: 'Wrong username or password.' })
    } else {
      res.json([
        { amount: 10 },
        { amount: 20 },
        { amount: 30 },
      ])
    }
  }, 800)
})

router.get('/profile', (req, res) => {
  setTimeout(() => {
    // TODO: refactor this check of credentials
    if (req.param('token', '') !== TOKEN_ID) {
      res.status(401).json({ errorCode: 'WRONG_CREDENTIALS', message: 'Wrong username or password.' })
    } else {
      res.json(USER)
    }
  }, 800)
})

// TODO: this is a stub for implementing profile authentication
router.post('/login', (req, res) => {
  setTimeout(() => {
    if (req.body.email !== USER.email) {
      res.status(401).json({ errorCode: 'WRONG_CREDENTIALS', message: 'Wrong username or password.' })
    } else {
      res.json({
        token: TOKEN_ID,
      })
    }
  }, 800)
})

module.exports = router
