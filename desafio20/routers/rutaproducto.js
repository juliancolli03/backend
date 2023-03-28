const {get,add,update,deelete} = require("../controllers/controlerProductos")
const { Router } = require('express');

const productos = Router()

productos.get("/",get)
productos.post("/",add)
productos.put("/:id",update)
productos.delete("/:id",deelete)

module.exports=productos