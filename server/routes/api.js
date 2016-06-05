const express = require('express')
const router = express.Router()

const TOKEN_ID = 'a-secret-token-string'
const USER = {
  email: 'test@user.com',
}

router.get('/user', (req, res) => {
  setTimeout(() => {
    // TODO: refactor this check of credentials
    if (req.body.token !== TOKEN_ID) {
      res.status(401).json({ error: 'WRONG_CREDENTIALS' })
    } else {
      res.json(USER)
    }
  }, 800)
})

// TODO: this is a stub for implementing user authentication
router.post('/login', (req, res) => {
  setTimeout(() => {
    if (req.body.email !== USER.email) {
      res.status(401).json({ error: 'WRONG_CREDENTIALS' })
    } else {
      res.json({
        email: req.body.email,
        tokenId: TOKEN_ID,
      })
    }
  }, 800)
})

module.exports = router
