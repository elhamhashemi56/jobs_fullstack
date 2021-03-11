const express = require('express')
const router = express.Router()
const auth = require('../midlleware/auth')

const { jobGetController,jobPostController,deleteJob } = require('../controller/job_controller')

router.route('/')
  .get(auth,jobGetController)
  .post(jobPostController)


router.route('/:id').delete(deleteJob)


module.exports = router