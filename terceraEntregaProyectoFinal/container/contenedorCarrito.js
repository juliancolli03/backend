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
			console.log(err)
		}
	}

	async getCart(correo) {
		try {
			const cart = await cartModels.find({ 'autor.username': correo }
			);
			return cart;
		} catch (err) {
			console.log('Error al buscar el carrito ' + err);
		}
	}

	async updateCart(correo, data) {
		try {
			const producUpdate = await cartModels.updateOne({ 'autor.username': correo }, data);
			return producUpdate;
		} catch (err) {
			console.log('Error al buscar el carrito y actualizar ' + err);
		}
	}

	async deleteCart(correo) {
		try {
			const producDelete = await cartModels.deleteOne({ 'autor.username': correo });
			return producDelete;
		} catch (error) {
			console.log('Error al borrar el carrito ' + err);
		}
	}
}

module.exports= containerCart