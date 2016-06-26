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

const config = require('../config')
const BACKEND_API_URL = `${config.backendApi.host}:${config.backendApi.port}`
const request = require('superagent')
const utils = require('../utils')


router.get('/profile', (req, res) => {
  setTimeout(() => {
    res.json(USER)
  }, 800)
})

router.post('/login', (req, res) => {
  request.post(`${BACKEND_API_URL}/api/Users/login`)
    .send({
      email: req.body.email,
      password: req.body.password,
    }).end((error, response) => {
      if (error) {
        if (error.status && error.status === 401) {
          res.status(401)
            .json({
              errorCode: 'WRONG_CREDENTIALS',
              message: 'Wrong username or password.',
            })
        } else {
          res.status(500)
            .json({
              errorCode: 'SERVER_ERROR',
              message: 'Server unavailable.',
            })
        }
      } else {
        res.json({
          token: response.body.id,
        })
      }
    })
})

router.post('/signup', (req, res) => {
  recaptcha.validate(req.body.captchaResponse)
    .then(() => {
      setTimeout(() => {
        if (req.body.email !== USER.email) {
          res.status(401)
            .json({
              errorCode: 'WRONG_CREDENTIALS', 
              message: 'Wrong username or password.',
            })
        } else {
          res.json({
            token: TOKEN_ID,
          })
        }
      }, 800)
    }).catch(() => {
      res.status(403)
        .json({
          errorCode: 'ACCESS_DENIED',
          message: 'Captcha is not verified.',
        })
    })
})

module.exports = router
