const express = require('express')
const cluster = require('cluster')
const session = require('express-session')
const {peligro,error,todos} = require("./log")
const cookieParser = require("cookie-parser")
const os = require('os')
const MongoStore = require("connect-mongo")
const {ingresar,salirse,registrarse} = require("./routers/rutaingresar")
const compression = require("compression")
const test = require("./routers/test")
const info = require("./routers/info")
const apiRandom = require("./routers/apiRandom")
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const container = require("./container/contenedorchat")
const { normalize, denormalize, schema } = require('normalizr')
const util = require ('util')
const passport = require("passport")
const dotenv = require("dotenv")
dotenv.config();
const parseArgs = require('minimist')
const MONGO = process.env.DBLOCAL;

const { PORT, MODE } = parseArgs(process.argv.slice(2), { 
  alias: { 
    p: "PORT",
    m: "MODE",
  },
  default: { 
    PORT: 8080,
    MODE: "FORK",
  }
})

let chat = new container();
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology:true}
if (MODE === 'CLUSTER' && cluster.isPrimary) {
  const numCpus = os.cpus().length

  console.log('SERVIDOR PRIMARIO DEL CLUSTER: ')
  console.log('Número de procesadores: ' + numCpus)
  console.log('PID:' + process.pid)

  for (let i = 0; i < numCpus; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
    console.log('Worker ' + process.pid + ' exit')
    cluster.fork()
  })
} else {
let mensajes = []
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(session({
  store: MongoStore.create({
    mongoUrl: MONGO,
    mongoOptions: advancedOptions
  }),
  secret: "coderhouse",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {maxAge: 100000}
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/info',compression(), info)
// app.use('/apirandom', apiRandom)
app.use('/ingresar', ingresar, ()=>{
  peligro.warn("ingresa asi podes mandar msj")

})
app.use("/registrarse", registrarse);
app.use("/salirse", salirse);
app.use("/api/productos-test",test)
app.get('/productos', async (req, res) => {
  peligro.warn("tenes q estar loguado para entrar aca")
  const usuario = req.user.name
  if (usuario === null || usuario === undefined) {
      return res.redirect("/ingresar")
  }
  res.render('inicio', {mensajes,chat,usuario} )
})







io.on('connection', async socket =>{
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
  
    
      io.sockets.emit('menssages', listaMensajes)
    })
      todos.info("mandando msj")

    })
  
  
  function print(objeto) {
      // console.log(util.inspect(objeto,false,12,true))
  }


// const PORT = 8080

httpServer.listen(PORT, () => {
  todos.info("iniciando server")

     console.log(`Servidor escuchando en el puerto ${PORT}`)
})


}