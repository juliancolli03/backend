const {peligro,error,todos} = require("../logs/log")
const container = require("../persistencia/container/contenedorchat")

let mensajes = []
let chat = new container();

const productos =  async (req, res) => {
    peligro.warn("tenes q estar loguado para entrar aca")
    const usuario = req.user.name
    if (usuario === null || usuario === undefined) {
        return res.redirect("/ingresar")
    }
    res.render('inicio', {mensajes,chat,usuario} )
  }

module.exports=productos