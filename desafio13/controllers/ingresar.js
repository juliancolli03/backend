const getUsuario = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/productos")
    }
    res.render("inicioDeIngreso")
};

const crearUsuario = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/productos")
    }
    res.render("registrate")
}

const salir = (req, res) => {
    const usuario = req.user.text;
    req.logout(err => {
        const saludo = `Hasta luego ${usuario}`;
        res.render("saludo", {saludo});
    });
};

module.exports = {
    getUsuario,
    crearUsuario,
    salir
}