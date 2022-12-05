const express = require('express')
const { Router } = express
const app = express()
const productos =  require("./routers/rutaproducto")
const carrito = require("./routers/rutacarrito")
const validacionRuta = require("./midlewars/admin")
app.use(express.static(__dirname+'/public'));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// const productos = new Router()
// const carrito = new Router()
const PORT = process.env.PORT || 8080
if(validacionRuta){
app.use("/api/productos", productos)
app.use("/api/carrito", carrito)
}

app.get('*', function (req, res) {
    res.sendFile(__dirname+'/public/error.html');
})


app.listen(PORT,()=>{
    console.log("perfecto")


})