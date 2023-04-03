class ProductDto {
    constructor({ id, nombre, precio, foto }) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.foto = foto
    }
  }
  
  module.exports = function formatDTO(products) {
    if (Array.isArray(products)) {
        return products.map(obj => new ProductDto(obj))
    } else {
        return new ProductDto(products)
    }
  }