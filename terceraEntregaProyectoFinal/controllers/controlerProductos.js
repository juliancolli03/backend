const containerProducts = require("../container/contenedorProd")
const products = new containerProducts();

 const get = (req, res) => {
	// if (req.user === undefined) {
	// 	return products
	// 		.get()
	// 		.then((productos) => {
	// 			res.json({ productos });
	// 		})
	// 		.catch((err) => {
	// 			res.json(err);
	// 		});
	// }

	// if (req.user?.admin) {
	// 	return products
	// 		.get()
	// 		.then((productos) => {
	// 			res.json({ productos});
	// 		})
	// 		.catch((err) => {
	// 			res.json(err);
	// 		});
	// }
	products
		.get()
		.then((productos) => {
			res.json({ productos});
		})
		.catch((err) => {
			res.json(err);
		});
};

 const add = (req, res) => {
	const newProduct = {
		timestamp: Date.now(),
		nombre: req.body.nombre,
		descripcion: req.body.descripcion,
		codigo: req.body.codigo,
		precio: req.body.precio,
		foto: req.body.foto,
		stock: req.body.stock,
	};
	products
		.add(newProduct)
		.then(() => {
			res.json({newProduct});
		})
		.catch((err) => {
			res.json(err);
		});
};

const update = (req, res) => {
	const id = req.params.id;
	const newProduct = {
		timestamp: Date.now(),
		nombre: req.body.nombre,
		descripcion: req.body.descripcion,
		codigo: req.body.codigo,
		precio: req.body.precio,
		foto: req.body.foto,
		stock: req.body.stock,
	};
	console.log(newProduct);
	products
		.update(id, newProduct)
		.then(() => {
			res.json({newProduct});
		})
		.catch((err) => {
			res.json(err);
		});
};

 const deelete = (req, res) => {
	const id = req.params.id;
	products
		.delete(id)
		.then(() => {
			res.json({products});
		})
		.catch((err) => {
			res.json(err);
		});
};


module.exports= {get,add,update,deelete}