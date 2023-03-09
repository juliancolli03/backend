const containerProducts = require("../container/contenedorProd")
const containerCart = require("../container/contenedorCarrito")

const carrito = new containerCart();
const producto = new containerProducts();

 const getCarrito = (req, res) => {
    // console.log(req.username)

    const correo = req.user.username;

	carrito
		.getCart(correo)
		.then((carritos) => {
			console.log(carritos);
			res.json({ carritos });
		})
		.catch((err) => {
			res.json(err);
		});
};

const postProductoCarrito = (req, res) => {
	const correo = req.user.username;
	const idProducto = req.body.id;
	carrito.getCart(correo).then((cart) => {
		if (!cart.length) {
			const newCart = {
				autor: {
					nombre: req.user.nombre,
					direccion: req.user.direccion,
					numero: req.user.numero,
					username: req.user.username,
				},
				productos: [],
				timestamp: Date.now(),
			};
			carrito.addCart(newCart);
		}
	});
	producto.getId(idProducto).then((producto) => {
		let product = producto;
		carrito.updateCart(correo, { $push: { productos: product } });
	});
	res.json(carrito)
};
const deleteProductoCarrito = (req, res) => {
	const idProducto = req.body.id;
	const idCarrito = req.user.username;

	producto.getId(idProducto).then((producto) => {
		let product = producto;
		carrito.updateCart(idCarrito, { $pull: { productos: product } });
		
	});

	res.json(carrito)
};

 const deleteCarrito = (req, res) => {
	carrito
		.deleteCart(req.user.username)
	res.json(carrito)
};

module.exports={getCarrito,postProductoCarrito,deleteCarrito,deleteProductoCarrito}