

const express = require('express')
const router = express.Router()

const { mainGetController } = require('../controller/main_controller')

router.route('/').get(mainGetController)

module.exports = router