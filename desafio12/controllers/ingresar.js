const getUsuario = (req, res) => {
    const usuario = req.session.text
    if (usuario === null || usuario === undefined) {
        res.render("inicioDelngreso")
    }
    else{
        res.redirect("/productos")
    }
}

const crearUsuario = (req, res) => {
    const usuario = req.body.text
    console.log(usuario)
    req.session.text = usuario
    res.redirect("/productos")
}

const salir = (req, res) => {
    const usuario = req.session.text
    const saludo = `Hasta luego ${usuario}`
    req.session.destroy( err => {
        if (err){
          res.json({error: "algo hiciste mal", descripcion: err})
        } else {
            res.render("saludo", {saludo}) 
        }
    })
}

module.exports = {
    getUsuario,
    crearUsuario,
    salir
}