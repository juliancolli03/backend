const { getProductos, postProducto, putProducto, deleteProducto } = require('../controllers/controllerproducto');

const { Router } = require('express');
// const validateAdmin = require('../middlewares/validAdmin');

const admin = true;

const productosRouter = Router();

productosRouter.get('/:id?', getProductos);
productosRouter.post('/',  postProducto);
productosRouter.put('/:id', putProducto);
productosRouter.delete('/:id', deleteProducto);

module.exports = productosRouter;