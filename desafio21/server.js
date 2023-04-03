const express = require('express')
const cluster = require('cluster')
const session = require('express-session')
const {todos} = require("./logs/log")
const prodcutos = require("./controllers/productos")
const cookieParser = require("cookie-parser")
const os = require('os')
const productos = require("./routers/rutaproducto")
const MongoStore = require("connect-mongo")
const {ingresar,salirse,registrarse} = require("./routers/rutaingresar")
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const passport = require("passport")
const dotenv = require("dotenv")
const socketChat = require("./socket/socket")
const cors = require("cors")
const productRouter = require('./routers/rutagraphql');

dotenv.config();
const parseArgs = require('minimist')
const MONGO = process.env.DBNUBE;

const {MODE} = parseArgs(process.argv.slice(2), { 
  alias: { 
    p: "PORT",
    m: "MODE",
  },
  default: { 
    // PORT: 8080,
    MODE: "FORK",
  }
})

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
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(cors())
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
app.use('/ingresar', ingresar)
app.use("/registrarse", registrarse);
app.use("/salirse", salirse);
app.get('/productos',prodcutos )
app.use("/productoos",productos)
app.use("/graphql",productRouter.startGraphQL())
io.on('connection', socketChat)

const puerto  = process.env.PORT || 8080
httpServer.listen(puerto, () => {
  todos.info("iniciando server")
    console.log(`Servidor escuchando en el puerto ${puerto}`)
})
//creo comentario para probar que se suba a
}