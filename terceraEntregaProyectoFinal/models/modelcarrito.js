const mongoose = require('mongoose');

const collectionCart = 'carrito';

const schemaCart = new mongoose.Schema({
	autor: {
		name: String,
		direccion: String,
		numero: Number,
		username: String,
	},
	productos: [],
	timestamp: String,
});

const modelCart = mongoose.model(collectionCart, schemaCart);

module.exports=modelCart;