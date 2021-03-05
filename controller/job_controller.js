const { jobModell }= require("../modells/job-modell");
const jwt = require('jsonwebtoken')

// GET *************************************
const jobGetController = (req, res, next) => {
    res.status(200).render('neuposition')
};

// POST ***************************************
const jobPostController = (req, res, next) => {

    console.log(req.body);
    jobModell.create(req.body).then((ergebniss)=>{
        res.render('jobpostergebniss',ergebniss)
    }).catch((fehler)=>{
        res.render('fehler',fehler)
    })
};

module.exports={jobGetController,jobPostController }
