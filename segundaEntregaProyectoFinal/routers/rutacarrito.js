const {getProductos, postProducto, putProducto, deleteProducto } = require('../controllers/controlerFirebase');

const { Router } = require('express');
// const logRequestInfo = require('../middlewares/logRequestInfo');

const carritoRouter = Router();

// carritoRouter.use(logRequestInfo);

 carritoRouter.post('/', postProducto);
carritoRouter.delete('/:id', deleteProducto);
carritoRouter.get('/:id/productos', getProductos);
carritoRouter.post('/:id/productos', putProducto);
// carritoRouter.delete('/:id/productos/:id_prod', deleteById);

module.exports = carritoRouter;