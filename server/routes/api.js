'use strict'

const express = require('express')
const router = express.Router()

const ReCaptcha = require('recaptcha2')
const recaptcha = new ReCaptcha({
  siteKey: '6LegTyITAAAAALkNMIBSAuTqq81PLCcESBHWz0yM',
  secretKey: '6LegTyITAAAAAOpspb_QGzypBGIt9FGDLxda2f2C',
})

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
        { name: 'Food', id: 1 },
        { name: 'Entertainment', id: 2 },
        { name: 'Work', id: 3 },
      ])
    }
  }, 800)
})

const randomInRange = (from, to) => Math.floor(Math.random() * (to - from)) + from
const randomDate = (start, end) => (
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
)

randomDate(new Date(2012, 0, 1), new Date())

router.get('/entries', (req, res) => {
  setTimeout(() => {
    // TODO: refactor this check of credentials
    if (req.param('token', '') !== TOKEN_ID) {
      res.status(401).json({ errorCode: 'WRONG_CREDENTIALS', message: 'Wrong username or password.' })
    } else {
      const data = []
      let i = 0
      while (i < 100) {
        data.push({
          id: i,
          date: randomDate(new Date(2016, 1, 1), new Date()),
          amount: randomInRange(10, 100),
          type: ['e', 'i'][randomInRange(0, 2)],
          categoryId: randomInRange(1, 3) })
        i++
      }
      res.json(data)
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

router.post('/signup', (req, res) => {
  recaptcha.validate(req.body.captchaResponse)
    .then(() => {
      setTimeout(() => {
        if (req.body.email !== USER.email) {
          res.status(401).json({ errorCode: 'WRONG_CREDENTIALS', message: 'Wrong username or password.' })
        } else {
          res.json({
            token: TOKEN_ID,
          })
        }
      }, 800)
    }).catch(() => {
      res.status(403).json({ errorCode: 'ACCESS_DENIED', message: 'Captcha is not verified.' })
    })
})

module.exports = router
