
const {jobModell}= require("../modells/job-modell");

const mainGetController = (req, res, next) => {

    jobModell.find().lean().then((ergebniss)=>{
        res.render('startseite',{heute: new Date(),jobs:ergebniss})
    }).catch((fehler)=>{
        res.render('startseite',{heute: new Date(),fehler:fehler})
    })
};

module.exports={mainGetController }
