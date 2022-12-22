// import mongoose from "mongoose";
const mongoose = require ("mongoose")
const URL = "mongodb+srv://juliancolli:<backend>@primercluster.zfdig3v.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

console.log("conectados correctamente")
