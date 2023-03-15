const container = require("../persistencia/container/contenedorchat")

let mensajes = []
let chat = new container();

const getInicioModel = (usuario) =>{
    return{
        mensajes,
        chat,
        usuario
    }
}

module.exports=getInicioModel