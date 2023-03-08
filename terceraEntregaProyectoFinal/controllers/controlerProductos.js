const containerProducts = require("../container/contenedorProd")
const products = new containerProducts();

 const get = (req, res) => {
	if (req.user === undefined) {
		return products
			.get()
			.then((productos) => {
				res.render('User/productosUser', { productos });
			})
			.catch((err) => {
				res.json(err);
			});
	}
	const user = req.user.username;
	const avatar = req.user.photo;
	const saludo = `Bienvenido ${user}`;
	if (req.user?.admin) {
		return products
			.get()
			.then((productos) => {
				res.render('Admin/productosAdmin', { productos, saludo, avatar });
			})
			.catch((err) => {
				res.json(err);
			});
	}
	products
		.get()
		.then((productos) => {
			res.render('UserLogin/productosUserLogin', { productos, saludo, avatar });
		})
		.catch((err) => {
			res.json(err);
		});
};

//  const getB = (req, res) => {
// 	const name = req.body.nameb.toUpperCase() + req.body.nameb.slice(1);
// 	if (req.user === undefined) {
// 		return products
// 			.get(name)
// 			.then((productos) => {
// 				res.render('User/productosUser', { productos });
// 			})
// 			.catch((err) => {
// 				res.json(err);
// 			});
// 	}
// 	const user = req.user.username;
// 	const avatar = req.user.photo;
// 	const saludo = `Bienvenido ${user}`;
// 	if (req.user?.admin) {
// 		return products
// 			.get(name)
// 			.then((productos) => {
// 				res.render('Admin/productosAdmin', { productos, saludo, avatar });
// 			})
// 			.catch((err) => {
// 				res.json(err);
// 			});
// 	}
// 	products
// 		.get(name)
// 		.then((productos) => {
// 			res.render('UserLogin/productosUserLogin', { productos, saludo, avatar });
// 		})
// 		.catch((err) => {
// 			res.json(err);
// 		});
// };

 const add = (req, res) => {
	const newProduct = {
		timestamp: Date.now(),
		nombre: req.body.name.toLowerCase().toUpperCase() + req.body.name.slice(1),
		descripcion: req.body.description,
		codigo: req.body.code,
		precio: req.body.price,
		foto: req.body.photo,
		stock: req.body.stock,
	};
	products
		.add(newProduct)
		.then(() => {
			res.redirect('/productos');
		})
		.catch((err) => {
			res.json(err);
		});
};

const update = (req, res) => {
	const id = req.params.id;
	const newProduct = {
		timestamp: Date.now(),
		nombre: req.body.name,
		descripcion: req.body.description,
		codigo: req.body.code,
		precio: req.body.price,
		foto: req.body.photo,
		stock: req.body.stock,
	};
	console.log(newProduct);
	products
		.update(id, newProduct)
		.then(() => {
			res.redirect('/productos');
		})
		.catch((err) => {
			res.json(err);
		});
};

 const Delete = (req, res) => {
	const id = req.params.id;
	products
		.delete(id)
		.then(() => {
			res.redirect('/productos');
		})
		.catch((err) => {
			res.json(err);
		});
};

//cambiar los redirect, y render, por los mios

module.exports= {get,add,update,Delete}