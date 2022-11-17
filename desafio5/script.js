const express = require('express')

const app = express()

const personas = []

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'ejs')

// get

app.get('/productos', (req, res) => {
    res.render('inicio', {personas})
})

// post

app.post('/productos', (req, res) => {
    personas.push(req.body)
    res.redirect('/productos')
})

app.listen(8080)


// prefiero el motor de plantillas ejs ya que tiene una sintaxis ssencilla y es rapido de aprender