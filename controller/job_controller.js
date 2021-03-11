const { jobModell }= require("../modells/job-modell");
const jwt = require('jsonwebtoken')

// GET *************************************
const jobGetController = (req, res, next) => {
    res.status(200).render('neuposition',{csrfTocken:req.csrfToken()})
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


// DELETE ***************************************   
const deleteJob = (req,res, next) =>{
    console.log("delete job!", req.body.id);
    jobModell.deleteOne({_id: req.body.id})
    .then((ergebnis) => {
        res.status(200).json({ result: `Job ${req.body.id} wurde gelöscht`});
    }).catch((fehler) => {
      console.log(fehler);
    });
  }

module.exports={jobGetController,jobPostController,deleteJob }
