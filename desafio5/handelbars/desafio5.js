const express = require('express')
const handlebars = require('express-handlebars')

const app = express()

app.engine('handlebars', handlebars.engine(
    {
        extname: '.handlebars',
        defaultLayout: 'inicio.handlebars',
        layoutsDir: __dirname + '/views/'
        }
))

const productos = []

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('views', './views')

app.set('view engine', 'handlebars')

// get

app.get('/productos', (req, res) => {
    res.render('historial', {productos})
})

app.get('/', (req, res) => {
    res.render('form.handlebars')
})

// post

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/')
})

app.listen(8080)


// prefiero el motor de plantillas ejs ya que tiene una sintaxis ssencilla y es rapido de aprender