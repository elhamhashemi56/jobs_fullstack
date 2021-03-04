const { jobModell }= require("../modells/job-modell");

// GET *************************************
const jobGetController = (req, res, next) => {
    if(req.cookies.nutzerCookie){
        let token=req.cookies.nutzerCookie
        let tokenlesbar=jwt.verify(token,process.env.JWT || 'geheimniss')
        if(tokenlesbar.nutzername){
            res.status(200).render('neuposition')
        }
    }else{
        res.status(400).render('nichteingeloggt')
    }
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
