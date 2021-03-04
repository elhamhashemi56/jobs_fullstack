/** Mongoose Modul importieren  */
const mongoose = require("mongoose");
let addressString = process.env.mongo || "mongodb://localhost:27017/jobsDB";
let optionen = { useNewUrlParser: true, useUnifiedTopology: true };

const verbindeDB = () => {

    mongoose.connect(addressString, optionen).then( (mongooseModul) => {
        console.log("Bin mit der jobsDB verbunden");

    } ).catch( (fehler) => {
        console.error("Fehler mit MongoDB: "+fehler);
    } );

}

module.exports = verbindeDB;