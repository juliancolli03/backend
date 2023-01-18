const test = require("./routers/test")
const ingresar = require("./routers/rutaingresar")
const container = require("./container/contenedor")
const express = require('express')
const session = require('express-session')
const cookieParser = require("cookie-parser")
const MongoStore = require("connect-mongo")
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { normalize, denormalize, schema } = require('normalizr')
const util = require ('util')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology:true}

 let mensajes = []
 let chat = new container();

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use("/api/productos-test",test)
app.set('view engine', 'ejs')

app.use(cookieParser())
app.use(session({
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://juliancolli:1234@primercluster.zfdig3v.mongodb.net/?retryWrites=true&w=majority",
    mongoOptions: advancedOptions
  }),
  secret: "coderhouse",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {maxAge: 60000}
}))




app.get('/ingresar', async (req, res) => {
    
  res.render('ingresar', ingresar )
})

if(ingresar){
  app.get('/productos', async (req, res) => {
    
    res.render('inicio', {mensajes,chat} )
})
}

app.use(express.static("public"))

io.on('connection', async socket =>{
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

    print(messagesNorm)

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
  
    
      io.sockets.emit('menssages', listaMensajes)
    })
  })
  
  function print(objeto) {
      console.log(util.inspect(objeto,false,12,true))
  }


const PORT = 8080

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})


