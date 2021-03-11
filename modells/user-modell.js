const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
    vorname:String,
    email:String,
    password:String,
    bild: String,
})

const  userModell= mongoose.model('user', userSchema ,'users') ;
module.exports = { userModell };