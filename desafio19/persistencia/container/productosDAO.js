const mongoose = require('mongoose');
const dotenv = require("dotenv")
const modelProduc = require("../models/modelsProducto")
dotenv.config();
const dto = require("../dto/productosDTO")
const MONGO = process.env.DBNUBE;

mongoose.set('strictQuery', false);
mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    
});

class containerProducts {
	async add(data) {
		try {
			const dataAdd = new modelProduc(data);
			const add = await dataAdd.save(dataAdd);
			return dto(add);
		} catch (err) {
			console.log(err);
		}
	}

	async get(name) {
		try {
			if (name) {
				const data = await modelProduc.find({ nombre: name });
                //cambiar a nombre si no va y/o ponerle find
				return dto(data);
			} else {
				const data = await modelProduc.find();
				return dto(data);
			}
		} catch (err) {
			console.log(err);
		}
	}

	async update(id, data) {
		try {
			const update = await modelProduc.updateOne({ _id: id }, data);
			return dto (update);
		} catch (err) {
			console.log(err);
		}
	}
	async getId(id) {
	
			const data = await modelProduc.findById(id);
			return dto(data);
		
	}

	async delete(id) {
		try {
			const deelete = await modelProduc.deleteOne({ _id: id });
			return dto(deelete);
		} catch (err) {
			console.log(err);
		}
	}
}
module.exports = containerProducts;