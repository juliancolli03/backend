const {crearUsuario,getUsuario,salir} = require("../controllers/ingresar")
const { Router } = require('express');

const ingresar = Router();
const registrarse = Router()
const salirse = Router()
ingresar.get('/', getUsuario)
ingresar.post('/', crearUsuario)

ingresar.get('/salir', salir)

module.exports= {ingresar,registrarse,salirse}