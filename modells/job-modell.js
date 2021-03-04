const mongoose = require("mongoose");

const jobSchema=new mongoose.Schema({
    firma:String,
    position:String,
    von:String,
    bis:String
})

const  jobModell= mongoose.model('job', jobSchema ,'jobs') ;
module.exports = { jobModell };