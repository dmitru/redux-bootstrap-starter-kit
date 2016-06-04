const express = require('express')
const router = express.Router()

router.post('/login', (req, res, next) => {
  // TODO: this is a stub for implementing user authentication
  res.json({
    email: req.body.email,
    tokenId: 'a-secret-token-string',
  })
})

module.exports = router
