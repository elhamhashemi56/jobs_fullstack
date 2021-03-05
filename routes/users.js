const express = require('express')
const router = express.Router()

const { userGetController,userPostController } = require('../controller/user_controller')

router.route('/')
  .get(userGetController)
  .post(userPostController)


module.exports = router