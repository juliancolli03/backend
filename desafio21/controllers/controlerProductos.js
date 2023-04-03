const containerProducts = require("../persistencia/container/contenedorProd")
const products = new containerProducts();

 const get = (req, res) => {
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
	const correo = req.user.username;
	// if(correo=="jc@gmail.com"){
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
//}
// else{
// 	res.json("no estas autorizado a crear productos")
// }
};

const update = (req, res) => {
	// const correo = req.user.username;
	// if(correo=="jc@gmail.com"){

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
// }else{
// 	res.json("no estas autorizado a actualizar productos")
// }
};

 const deelete = (req, res) => {
	// const correo = req.user.username;
	// if(correo=="jc@gmail.com"){
	const id = req.params.id;
	products
		.delete(id)
		.then(() => {
			res.json({products});
		})
		.catch((err) => {
			res.json(err);
		});
// }else{
// 	res.json("no estas autorizado a borrar productos")
// }
 }
 ;


module.exports= {get,add,update,deelete}