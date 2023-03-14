const {peligro,error,todos} = require("../logs/log")

const getUsuario = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/productos")
    }
    peligro.warn("ingresa asi podes mandar msj")
    return res.render("iniciodeingreso")
};

const salir = (req, res) => {
    const usuario = req.user.name;
    req.logout(err => {
        const saludo = `Hasta luego ${usuario}`;
        res.render("saludo", {saludo});
    });
};

module.exports = {
    getUsuario,
    salir
}