const mongoose = require('mongoose');
const modelsUsuario = require("../models/modelsusuario")
const dotenv = require("dotenv")
const path = require("path")
dotenv.config();
const MONGO = process.env.DBNUBE;

mongoose.set('strictQuery', false);
mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    
});


class Container {
    
    async getUsuario(data){
        const usuario = await modelsUsuario.findOne({username: data});
        return usuario;
    }

    async addUsuario(data){
        const dataAdd = new modelsUsuario(data);
        const add = await dataAdd.save();
        return add;
        
    }
    
}

module.exports = Container;




    
   

