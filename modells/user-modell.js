const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
    vorname:String,
    nachname:String,
    alter:Number,
    wohnort:String,
    beruf:String,
    email:String,
    password:String
})

const  userModell= mongoose.model('user', userSchema ,'users') ;
module.exports = { userModell };