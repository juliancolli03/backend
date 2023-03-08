const mongoose = require('mongoose');

const collectionCart = 'carrito';

const schemaCart = new mongoose.Schema({
	author: {
		name: { type: String},
		address: { type: String },
		phoneNumber: { type: Number},
		username: { type: String},
	},
	productos: [],
	timestamp: String,
});

const modelCart = mongoose.model(collectionCart, schemaCart);

module.exports=modelCart;