// const { options } = require ("./conexDB/sqlLiteconn")
// const { config } = require ("./conexDB/mysqlconn")
// const ClienteSQL = require ("./container/chatscontainer")
// const ProductSQL = require("./container/sqlcontainer")
const test = require("./routers/test")
const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
// const Contenedor = require("../desafio2 y desafio3/desafio2Y3")

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

let mensajes = []
 let chats = []

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use("/api/productos-test",test)
app.set('view engine', 'ejs')

// const guardarChat = new Contenedor("chat")
// const sql = new ClienteSQL(options)
// const prodSQL = new ProductSQL(config)

// sql.crearTabla()
// prodSQL.crearTabla()
// const traerChat = async ()=>{
//     chats = await sql.insertarArticulos()
// }

app.get('/productos', async (req, res) => {
    // const chat = await guardarChat.getAll()
    
    res.render('inicio', {mensajes,chats} )
})



function print(objeto) {
    console.log(util.inspect(objeto,false,12,true))
}

app.use(express.static("public"))


// io.on('connection', async socket =>{
//     socket.on("connection", async =>{
// //         sql.crearTabla()
// // prodSQL.crearTabla()
//     })

//     console.log('Un cliente se ha conectado')

//     socket.emit('messages', mensajes)
//     // traerChat().then(() => socket.emit('chat', chats))
//     // socket.emit("chat",historialMensajes)

//     socket.on('new-message', async data => {
//         let insertarArticulos= await prodSQL.insertarArticulos(data)
//     insertarArticulos = await  prodSQL.listarArticulos()
    
//     mensajes = insertarArticulos

//         io.sockets.emit('messages', mensajes)
//     })

//     socket.on('new-msg',  async (data) => {
        
//       let insertarArticulos= await sql.insertarArticulos(data)
//     insertarArticulos = await  sql.listarArticulos()

//     chats = insertarArticulos
//     //    chats.push(data)
//        // const historialMensajes =  guardarChat.getAll()
   
//        io.sockets.emit('chat', chats)
//      })
//      socket.on("disconnect", async socket => {
//         console.log("desconcetado")
//         await prodSQL.close()
//       await sql.close()
//       console.log("desconcetado")
//     })
// })



const PORT = 8080

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})


