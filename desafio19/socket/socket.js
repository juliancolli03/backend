const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const express = require('express')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const container = require("../persistencia/container/chatDAO")
const { normalize, denormalize, schema } = require('normalizr')
const {peligro,error,todos} = require("../logs/log")
let chat = new container();
const tipoConec = require("../persistencia/factory/chatFACTORY")
let mongo =  tipoConec.getDao()

const socketChat = async (socket) =>{
    if(mongo){
    todos.info("conectado al socket. listo para mandar msj")
    const listaMensajes = await chat.getChat()
    const strin = JSON.stringify(listaMensajes)
    const data = JSON.parse(strin)
    const mensajesId = {
    id: 'backendCoder',
    messages: data
    };
    const autor = new schema.Entity('autor',{},{idAttribute: "email"})
    const messageSchema = new schema.Entity('mensaje', {
    autores: autor
    })
    const messagesSchema = new schema.Entity("messages", {
    messages: [messageSchema]
    });
  
    const messagesNorm = normalize(mensajesId, messagesSchema);

    // print(messagesNorm)

    const compresion =100 - JSON.stringify(messagesNorm).length * 100 / JSON.stringify(mensajesId).length + "%"


    socket.emit('menssages', messagesNorm)
    socket.emit("compres",compresion)
    socket.on('new-message', async data => {

    if (listaMensajes.length === 0) {
        return await chat.addChat({...data, id: 1,fecha:new Date().toLocaleString()
        })
    }
    await chat.addChat({...data, id: listaMensajes.length +1, fecha: new Date().toLocaleString(),
    })
  
    
    io.sockets.emit('menssages',  await chat.getChat())
    })
    todos.info("mandando msj")

}}

module.exports= socketChat