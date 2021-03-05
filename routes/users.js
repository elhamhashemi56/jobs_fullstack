const express = require('express')
const router = express.Router()

const { userGetController,userPostController,userGet_Einloggen,userPost_Eingeloggt } = require('../controller/user_controller')

router.route('/')
  .get(userGetController)
  .post(userPostController)

router.route('/login')
  .get(userGet_Einloggen)
  .post(userPost_Eingeloggt)

module.exports = router