require("dotenv").config();
const express=require("express")
const { jobModell } = require("./modells/job-modell");
const handlebars=require("express-handlebars")
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken')
const app=express()

const mainRouter = require('./routes/main');
const jobsRouter = require('./routes/jobs');



// connect to DB ************
const verbindeDB = require("./jobs-db");
verbindeDB();

//****************************



//Handlebars setting ***********************
app.engine('handlebars',handlebars())
app.set('view engine','handlebars')
//Handlebars setting ***********************


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser())

app.use('/', mainRouter);
app.use('/jobs', jobsRouter);


// app.get("/jobs",(req,res,next)=>{
//     if(req.cookies.nutzerCookie){
//         let token=req.cookies.nutzerCookie
//         let tokenlesbar=jwt.verify(token,process.env.JWT || 'geheimniss')
//         if(tokenlesbar.nutzername){
//             res.status(200).render('neuposition')
//         }
//     }else{
//         res.status(400).render('nichteingeloggt')
//     }
    
// })

// app.post("/jobs",(req,res,next)=>{
//     console.log(req.body);
//     jobModell.create(req.body)
//     .then((ergebniss)=>{
//         res.render('jobpostergebniss',ergebniss)
//     }).catch((fehler)=>{
//         res.render('fehler',fehler)
//     })
    
// })

// COOKIE *************************
app.get('/demo',(req,res)=>{

    let eintag=(1000*60*60*24)
    res.cookie('meincookie','das hier ist text im cookie',{
        maxAge:eintag,
        httpOnly:true
    }).cookie('meinzweitecooki','andere inhalt',{
        maxAge:eintag,
        httpOnly:true
    }).render('demo')
})

app.get('/mitcookie',(req,res)=>{
    console.log('cookie',req.cookies);
    res.render('mitcookie')
})
// *********************************

// LOGIN MIT COOKIE *********************
app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',(req,res)=>{


    let token=jwt.sign({
        nutzername:req.body.name
        },process.env.JWT || 'ein geheimniss',{expiresIn:'24h'})

    let eintag=(1000*60*60*24)
    res.cookie('nutzerCookie',token,{
        maxAge:eintag,
        httpOnly:true
    }).render('eingeloggt')
})
// *********************************


//NUR EINGELOGGENER NUTZER ***********
app.get('/geheims',(req,res)=>{
    if(req.cookies.nutzerCookie){
        let token=req.cookies.nutzerCookie
        let tokenlesbar=jwt.verify(token,process.env.JWT || 'Tokengehemnis')
        if(tokenlesbar.nutzername){
           return res.status(200).render('geheims',{name:tokenlesbar.nutzername})
        }
    }else{
        res.status(400).render('nichteingeloggt')
    }
    
})
//**********************************************


// LOG OUT ************************
app.get('/logout',(req,res)=>{
    res.clearCookie('nutzerCookie')
    res.render('logout')
})
//**********************************************

const port=process.env.PORT || 5050
app.listen(port,()=>{
    console.log(`ich lausche auf port ${port}`);
})