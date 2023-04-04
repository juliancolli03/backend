const DAOFactory = require("./persistencia/container/productosDAO");
const Producto = require("./persistencia/models/modelsProducto.js");
module.exports= class ProductRepo {
	dao
	prod
	constructor() {
		this.dao = new DAOFactory()
		this.prod = this.dao.prodDAO
	}

	async save(product) {
		try {
			const productId = await this.prod.add(product);
            return productId; 
		} catch (err) {
		}
	}                                                                          
	
	async getAll() {
		let data = null;
		try {
			data = await this.prod.getAll()
			return data.map(p => new Producto(p).datos())
		} catch (err) {
			return (data = []);
		}
	}
	async getById(id) {
		let data = null;
		try {
			data = await this.prod.getById(id)
			return data.map(p => new Producto(p).datos());
		} catch (err) {
			return (data = []);
		}
	}

	async delete(id) {
		try {
            const deleted = await this.prod.delete(id)
			return deleted
		} catch (err) {
		}
	}

	async update(obj) {
		try {
			const updated = await this.prod.update(obj)
			return new Producto(updated[0]).datos();
		} catch (err) {
            console.log(err);

		}
	}
}
