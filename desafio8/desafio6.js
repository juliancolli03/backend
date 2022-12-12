const { config } = require ("./conexDB/sqlLiteconn")
const ClienteSQL = require ("./container/sqlcontainer.js")


const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
// const Contenedor = require("../desafio2 y desafio3/desafio2Y3")

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const mensajes = []
let chats = []

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'ejs')

// const guardarChat = new Contenedor("chat")
const sql = new ClienteSQL(config)


const traerChat = async ()=>{
    chats = await sql.insertarArticulos()
}

app.get('/productos', async (req, res) => {
    // const chat = await guardarChat.getAll()
    
    res.render('inicio', {mensajes,chats} )
})

app.use(express.static("public"))


io.on('connection', async socket =>{
    // await guardarChat.save(socket)

    // const historialMensajes = await guardarChat.getAll()

    console.log('Un cliente se ha conectado')

    socket.emit('messages', mensajes)
    traerChat().then(() => socket.emit('chat', chats))
    // socket.emit("chat",historialMensajes)

    socket.on('new-message', data => {
        mensajes.push(data)

        io.sockets.emit('messages', mensajes)
    })

    socket.on('new-msg',  (data) => {
        sql.listarArticulos(data)
       chats.push(data)
       // const historialMensajes =  guardarChat.getAll()
   
       io.sockets.emit('chat', chats)
     })
})


const PORT = 8080

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})


console.log(sql)