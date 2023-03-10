const express = require('express')
const accountSid = 'AC81213771cb461f40ee3ab79d38e49664';
const authToken = '6efd92a67705cb497b50aad006735844';
const client = require('twilio')(accountSid, authToken);
const cluster = require('cluster')
const session = require('express-session')
const {peligro,error,todos} = require("./log")
const cookieParser = require("cookie-parser")
const os = require('os')
const MongoStore = require("connect-mongo")
const {ingresar,salirse,registrarse} = require("./routers/rutaingresar")
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const container = require("./container/contenedorchat")
const { normalize, denormalize, schema } = require('normalizr')
const passport = require("passport")
const dotenv = require("dotenv")
const multer = require("multer")
const productos = require("./routers/rutaproducto")
const carrito = require("./routers/rutacarrito")
const containerCart = require("./container/contenedorCarrito")
let miCarrito = new containerCart()
dotenv.config();
const parseArgs = require('minimist')
const nodemailer = require("nodemailer")
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
app.use('/ingresar', ingresar, ()=>{
  peligro.warn("ingresa asi podes mandar msj")

})
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: 'pruebacoder1211@gmail.com',
    pass: 'zryrpwputqicxqrz',
  },
  tls: {
    rejectUnauthorized: false
}
})
function info(nombre,correo,direccion,numero,edad){
transporter.sendMail({
  from: 'pruebacoder1211@gmail.com',
  to: 'pruebacoder1211@gmail.com',
  subject: "nuevo registro",
  text: `se registro la siguiente persona: Su nombre es: ${nombre},su correo es ${correo},vive en ${direccion}, su numero es ${numero} y tiene ${edad} años.`
})}
app.use("/registrarse", registrarse);
app.use("/salirse", salirse);
app.get('/productos', async (req, res) => {
  peligro.warn("tenes q estar loguado para entrar aca")
  const usuario = req.user.name
  const correo = req.user.username
  const direccion = req.user.direccion
  const numero = req.user.numero
  const edad = req.user.edad
  const fotohtml = req.user.urlfoto
  const fotonormal = req.user.foto
  if (usuario === null || usuario === undefined) {
      return res.redirect("/ingresar")
  }
  res.render('inicio', {mensajes,chat,usuario,fotohtml,fotonormal} )
  info(usuario,correo,direccion,numero,edad)
})
app.use("/productoos",productos)
app.use("/carrito",carrito)
app.use("/hacerpedido", async (req,res)=>{
  const usuario = req.user.name
  const correo = req.user.username
let carritoo = await miCarrito.getCart(correo)
 let productosCarro = JSON.stringify(carritoo.productos)
 console.log(productosCarro)
 res.json("gracias por tu compra")
 client.messages
.create({
    body: "Nuevo pedido de" + productosCarro + ". El nombre del q lo solicto es "+ usuario +"y su mail es " + correo,
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+5491169253825'
 })
 
 transporter.sendMail({
  from: 'pruebacoder1211@gmail.com',
  to: 'pruebacoder1211@gmail.com',
  subject: "nuevo pedido de"+usuario+correo,
  text: `se registro un nuevo pedido: ${productosCarro} `
})
      
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
  
    
      io.sockets.emit('menssages',  await chat.getChat())
    })
      todos.info("mandando msj")

    })
  
  
  function print(objeto) {
      // console.log(util.inspect(objeto,false,12,true))
  }


const puerto  = process.env.PORT || 8080
httpServer.listen(puerto, () => {
  todos.info("iniciando server")
    console.log(`Servidor escuchando en el puerto ${puerto}`)
})

}