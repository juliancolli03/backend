const container = require("../persistencia/container/chatDAO")

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