const { userModell }= require("../modells/user-modell");
const jwt = require('jsonwebtoken')

// GET *************************************
const userGetController = (req, res, next) => {
    res.status(200).render('anmelden')
};

// POST ***************************************
const userPostController = (req, res, next) => {

    console.log(req.body);
    userModell.create(req.body).then((ergebniss)=>{
        res.render('angemeldet',ergebniss)
    }).catch((fehler)=>{
        res.render('fehler',fehler)
    })
};

module.exports={userGetController,userPostController }
