const { Router } = require("express");
const Products = require( "../controllers/controlergraphql")
const router = Router();

module.exports= class ProductsRoutes {
    constructor() {
        this.productController = new Products();
    }

    start() {

        router.get('/', this.productController.getAll);
        router.post('/save', this.productController.save);
        router.get('/:id', this.productController.getById);
        router.delete('/:id', this.productController.delete);
        router.put('/update', this.productController.update);
        return router;
    }

    startGraphQL() {
        return this.productController.startGraphQL();
    }
}