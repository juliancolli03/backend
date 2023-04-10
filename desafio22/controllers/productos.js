const {peligro,error,todos} = require("../logs/log")
const getInicioModel = require("../servicios/productos.js")


const productos =  async (req, res) => {
    peligro.warn("tenes q estar loguado para entrar aca")
    const usuario = req.user.name
    if (usuario === null || usuario === undefined) {
        return res.redirect("/ingresar")
    }
    const obj = getInicioModel(usuario)
    res.render('inicio',obj  )
  }

module.exports=productos