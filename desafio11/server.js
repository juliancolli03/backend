const test = require("./routers/test")
const container = require("./container/contenedor")
const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { normalize, denormalize, schema } = require('normalizr')
const util = require ('util')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

 let mensajes = []
 let chat = new container();

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use("/api/productos-test",test)
app.set('view engine', 'ejs')



app.get('/productos', async (req, res) => {
    
    res.render('inicio', {mensajes,chat} )
})





app.use(express.static("public"))

io.on('connection', async socket =>{
    const listaMensajes = await chat.getChat()
    const autor = new schema.Entity('autor')
    const mensajes = new schema.Entity('mensajes', {
      autores: [autor]
    })
    const objNormalizado = normalize(listaMensajes, mensajes)
    const objDenormalizado = denormalize(objNormalizado.result, mensajes, objNormalizado.entities)
    // print(listaMensajes);
  
  
    
    socket.emit('messages', listaMensajes)
  
    socket.on('new-message', async data => {
      console.log(data)
      await chat.addChat(data)
  
      io.sockets.emit('messages', listaMensajes)
    })
  })
  
  function print(objeto) {
      console.log(util.inspect(objeto,false,12,true))
  }


const PORT = 8080

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})


