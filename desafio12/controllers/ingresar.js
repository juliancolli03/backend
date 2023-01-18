const getUsuario = (req, res) => {
    const usuario = req.session.text
    if (usuario === null || usuario === undefined) {
        res.render("ingresar")
    }
    else{
        res.redirect("/productos")
    }
}

const postUsurio = (req, res) => {
    const usuario = req.body.text
    req.session.text = usuario
    res.redirect("/productos")
}

const getSalir = (req, res) => {
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
    postUsurio,
    getSalir
}