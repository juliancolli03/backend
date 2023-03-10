const {getCarrito,postProductoCarrito,deleteCarrito,deleteProductoCarrito} = require("../controllers/controlerCarrito")
const { Router } = require('express');

const carrito = Router()
carrito.get("/",getCarrito)
carrito.post("/:id",postProductoCarrito)
carrito.delete("/",deleteCarrito)
carrito.delete("/:id",deleteProductoCarrito)

module.exports = carrito