require("dotenv").config();
const express=require("express")
const handlebars=require("express-handlebars")
const cookieParser = require("cookie-parser");
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