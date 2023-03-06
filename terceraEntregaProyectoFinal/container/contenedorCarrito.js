const mongoose = require('mongoose');
const dotenv = require("dotenv")
const cartModels = require("../models/modelcarrito")
dotenv.config();

const MONGO = process.env.DBNUBE;

mongoose.set('strictQuery', false);
mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    
});