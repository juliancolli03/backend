const express = require('express')

const app = express()

const productos = []

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.set('views', './views')

app.set('view engine', 'pug')

// get

app.get('/productos', (req, res) => {
    res.render('layout', {productos})
})


// post

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/productos')
})

app.listen(8080)