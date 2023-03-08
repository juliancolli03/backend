const mongoose = require('mongoose');
const dotenv = require("dotenv")
const cartModels = require("../models/modelcarrito")
dotenv.config();

const MONGO = process.env.DBNUBE;

mongoose.set('strictQuery', false);
mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    
});

class containerCart {
	async addCart(data) {
		try {
			const dataAdd = new cartModels(data);
			const cartAdd = await dataAdd.save();
			return cartAdd;
		} catch (err) {
			logger.error('Error al guardar el carrito ' + err);
		}
	}

	async getCart(correo) {
		try {
			const cart = await cartModels.find({ author: { username: correo } });
			return cart;
		} catch (err) {
			logger.error('Error al buscar el carrito ' + err);
		}
	}

	async updateCart(correo, data) {
		try {
			const producUpdate = await cartModels.updateOne({ author: { username: correo } }, data);
			return producUpdate;
		} catch (err) {
			logger.error('Error al buscar el carrito y actualizar ' + err);
		}
	}

	async deleteCart(correo) {
		try {
			const producDelete = await cartModels.deleteOne({ author: { username: correo } });
			return producDelete;
		} catch (error) {
			logger.error('Error al borrar el carrito ' + err);
		}
	}
}

module.exports= containerCart