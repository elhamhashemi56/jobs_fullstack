const express = require('express')
const router = express.Router()
const validator = require('express-validator');

const { userGetController,userPostController,userGet_Einloggen,userPost_Eingeloggt } = require('../controller/user_controller')

const validuser=[
  validator.check('vorname')
    .notEmpty().withMessage("Nutzername benötigt"),
  validator.check('email')
    .notEmpty().trim().isEmail().normalizeEmail().withMessage("muss gültige Mailadresse sein"),
  validator.check('password')
    .notEmpty().trim().withMessage("muss gültige password sein"),

// validator.check('iq')
  //     .isFloat({min: 50, max: 160}).withMessage("unrealistischer IQ"),
  // validator.check('plz')
  //    .matches(/[0-9]{5}/).withMessage("Postleitzahl muss exakt 5 Ziffern haben")
]

router.route('/')
  .get(userGetController)
  .post(validuser,userPostController)

router.route('/login')
  .get(userGet_Einloggen)
  .post(userPost_Eingeloggt)

module.exports = router