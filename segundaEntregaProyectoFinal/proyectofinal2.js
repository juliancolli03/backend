const express = require('express')
const app = express()
const productos =  require("./routers/rutaproducto")
const carrito = require("./routers/rutacarrito")
// const validacionRuta = require("./midlewars/admin")
// app.use(express.static(__dirname+'/public'));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// const productos = new Router()
// const carrito = new Router()
const PORT = process.env.PORT || 8080

app.use("/api/productos", productos)
app.use("/api/carrito", carrito)



app.listen(PORT,()=>{
    console.log("perfecto")


})