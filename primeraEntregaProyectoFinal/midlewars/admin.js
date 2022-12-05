const rutacarrito = require("../routers/rutacarrito")
const rutaproducto = require("../routers/rutaproducto")



const admin = true


if(admin==false){
const dosRutas = rutacarrito && rutaproducto
dosRutas.response.status(401)()
}

module.exports=admin