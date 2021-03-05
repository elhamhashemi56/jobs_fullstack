require("dotenv").config();
const express=require("express")
const handlebars=require("express-handlebars")
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken')
const app=express()

const mainRouter = require('./routes/main');
const jobsRouter = require('./routes/jobs');
const usersRouter = require('./routes/users');



// connect to DB ************
const verbindeDB = require("./jobs-db");
verbindeDB();

//****************************



//Handlebars setting ****************
app.engine('handlebars',handlebars())
app.set('view engine','handlebars')
//***********************************


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser())

app.use('/', mainRouter);
app.use('/jobs', jobsRouter);
app.use('/users', usersRouter);
app.use(express.static('public'))


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