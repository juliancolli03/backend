const axios = require("axios");

async function getProducts() {
    const { data } = await axios('http://localhost:8080/productoos')
    return data;
}

async function addProduct() {
    const data = await axios.post('http://localhost:8080/productoos', {
        nombre: 'producto',
        precio: 100,
        foto: 'prueba1.jpg',
    })
    return {
        status: data.status,
        statusText: data.statusText,
        data: data.data
    };
}

async function getById() {
    const data = await axios('http://localhost:8080/productoos/105')
    return {
        status: data.status,
        statusText: data.statusText,
        data: data.data
    };
}
async function deleteById() {
    const data = await axios.delete('http://localhost:8080/productoos/102')
    return {
        status: data.status,
        statusText: data.statusText,
        data: data.data
    }
}


async function updateByid(id) {
    const data = await axios.put(`http://localhost:8080/productoos/${id}`, {
        nombre: 'producto updated',
        precio: 200,
        foto: 'pruebaUpdated.jpg',
    })
    return {
        status: data.status,
        statusText: data.statusText,
        data: data.data
    }
}


getProducts()
console.log('-----> Obtener todos los productos');
console.log( getProducts());

addProduct()
console.log('-----> Agregar un producto');
console.log(addProduct());

getById()
console.log('-----> Obtener un producto por id');
console.log(getById());


deleteById()
console.log('-----> Eliminar un producto por id');
console.log(deleteById());

updateByid()
console.log('-----> Actualizar un producto por id');
console.log(updateByid()
);
