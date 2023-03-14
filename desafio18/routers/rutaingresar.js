const {getUsuario,salir} = require("../controllers/ingresar")
const passport = require("./middleware/passport")
const { Router } = require('express');
const ingresar = Router();
const registrarse = Router()
const salirse = Router()


ingresar.get("/", getUsuario);
ingresar.post("/",passport.authenticate("login", {
    failureRedirect: "/ingresar/errorIngresar", 
    successRedirect: "/productos",
}
));
ingresar.get("/errorIngresar", (req, res,done) => {
    done("error de log in");
});

registrarse.get("/", getUsuario);
registrarse.post("/", passport.authenticate("register", {
    failureRedirect: "/registrarse/errorRegistro", 
    successRedirect: "/productos",
}));
registrarse.get("/errorRegistro", (req, res,done)=> {
    done("error de registro");
});

salirse.get("/", salir);
module.exports= {ingresar,registrarse,salirse}