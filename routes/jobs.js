const express = require('express')
const router = express.Router()
const auth = require('../midlleware/auth')

const { jobGetController,jobPostController } = require('../controller/job_controller')

router.route('/')
  .get(auth,jobGetController)
  .post(jobPostController)


module.exports = router