const express = require('express')
const router = express.Router()

router.post('/login', (req, res, next) => {
  // TODO: this is a stub for implementing user authentication
  if (req.body.email !== 'test@user.com') {
    res.status(401).json({ error: 'WRONG_CREDENTIALS' })
  }
  res.json({
    email: req.body.email,
    tokenId: 'a-secret-token-string',
  })
})

module.exports = router
