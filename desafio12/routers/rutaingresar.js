const {getSalir,getUsuario,postUsurio} = require("../controllers/ingresar")
const { Router } = require('express');

const ingresar = Router();

ingresar.get('/', getUsuario)
ingresar.post('/', postUsurio)

ingresar.get('/salir', getSalir)

module.exports={
    ingresar
}
