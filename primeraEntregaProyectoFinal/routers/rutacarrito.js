const { postCarrito, deleteCarrito, getProductosCarrito, postProductoCarrito, deleteProductoCarrito } = require('../controllers/controlercarrito');

const { Router } = require('express');
// const logRequestInfo = require('../middlewares/logRequestInfo');

const carritoRouter = Router();

// carritoRouter.use(logRequestInfo);

carritoRouter.post('/', postCarrito);
carritoRouter.delete('/:id', deleteCarrito);
carritoRouter.get('/:id/productos', getProductosCarrito);
carritoRouter.post('/:id/productos', postProductoCarrito);
carritoRouter.delete('/:id/productos/:id_prod', deleteProductoCarrito);

module.exports = carritoRouter;