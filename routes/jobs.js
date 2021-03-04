const express = require('express')
const router = express.Router()

const { jobGetController,jobPostController } = require('../controller/job_controller')

router.route('/jobs')
  .get(jobGetController)
  .post(jobPostController)


module.exports = router