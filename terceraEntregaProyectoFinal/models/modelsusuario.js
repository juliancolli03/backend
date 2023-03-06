const mongoose = require("mongoose")

const collectionUsuario = "Usuario";

const schemaUsuario = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    direccion: String,
    numero: Number,
    edad: Number,
    foto: String,
    urlfoto: String,
});

const modelsUsuario = mongoose.model(collectionUsuario, schemaUsuario);

module.exports= modelsUsuario