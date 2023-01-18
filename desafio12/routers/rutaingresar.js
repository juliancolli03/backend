const {getSalir,getUsuario,postUsurio} = require("../controllers/ingresar")
const { Router } = require('express');

const ingresar = Router();

ingresar.get('/', getUsuario)
ingresar.post('/productos', postUsurio)

ingresar.get('/salir', getSalir)

module.exports={
    ingresar
}
