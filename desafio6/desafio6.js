const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const productos = []

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'ejs')

// get

app.get('/productos', (req, res) => {
    res.render('inicio', {productos})
})

// post

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/productos')
})

app.listen(8080)


// prefiero el motor de plantillas ejs ya que tiene una sintaxis ssencilla y es rapido de aprender