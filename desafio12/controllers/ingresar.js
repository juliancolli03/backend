const getUsuario = (req, res) => {
    const usuario = req.session.nombre
    if (usuario === null || usuario === undefined) {
        res.render("ingresar")
    }
    else{
        res.redirect("/productos")
    }
}

const postUsurio = (req, res) => {
    const usuario = req.body.nombre
    req.session.nombre = usuario
    res.redirect("/productos")
}

const getSalir = (req, res) => {
    const usuario = req.session.nombre
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