const Producto = require('../containers/mongodbContainer');

const contenedorProducto = new Producto();


const getProductos = (req, res) => {
    const id = req.params.id; 

    console.log(id);

    if(id === undefined) {
        const productos = contenedorProducto.getAll();
        res.json(productos);
    } else {
        const producto = contenedorProducto.getProductById(id);
        console.log(producto);
        res.json(producto);
    }

};

const postProducto = (request, res) => {
    const newProducto = {
        id : 0,
        timestamp : Date.now(),
        nombre : request.body.nombre,
        descripcion : request.body.descripcion,
        codigo : request.body.codigo,
        precio : request.body.precio,
        foto : request.body.foto,
        stock : request.body.stock,
    }

    res.json(contenedorProducto.createProduct(newProducto));
};

const putProducto = (request, res) => {

    const updateProducto = {
        id : 0,
        timestamp : Date.now(),
        nombre : request.body.nombre,
        descripcion : request.body.descripcion,
        codigo : request.body.codigo,
        precio : request.body.precio,
        foto : request.body.foto,
        stock : request.body.stock,
    }

    res.json(contenedorProducto.createProduct(request.params.id, updateProducto));
};

const deleteProducto = (request, res) => {
    
    res.json(contenedorProducto.deleteProductById(request.params.id));
}

module.exports = {
    getProductos,
    postProducto,
    putProducto,
    deleteProducto,
};