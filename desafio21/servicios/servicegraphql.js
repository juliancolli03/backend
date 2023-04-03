import prodGraphql from '../repo/productRepo.js';

module.exports= class ProductServices {
    constructor() {
        this.productsService = new prodGraphql()
    }
    getAll = async () => {
        try {
            const productos = await this.productsService.getAll();
            return productos;
        } catch (error) {
            console.log(error);
        }
    }

    save = async (product) => {

        try {
            let data = null
            if (typeof(product) === 'object') {
                data = product.product
            } else {
                data = product
            }
            const productId = await this.productsService.save(data);
            return productId;
        } catch (error) {
            console.log(error);
        }
    }

    delete = async (id) => {
        try {
            let ident = null
            if (typeof (id) === 'object') {
                ident = id.id
            } else {
                ident = id
            }
            const deleted = await this.productsService.delete(ident);
            return deleted
        } catch (error) {
            console.log(error);
        }
    }

    update = async (product) => {     
        try {
            let data = null
            if (typeof(product) === 'object') {
                data = {id: product.id, ...product.product}
            } else {
                data = product
            }
            const updatedProduct = await this.productsService.update(data);
            return updatedProduct;
        } catch (error) {
            console.log(error);
        }
    }
    getById = async (id) => {
        try {
            let ident = null
            if (typeof (id) === 'object') {
                ident = id.id
            } else {
                ident = id
            }
            const data = await this.productsService.getById(ident);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}