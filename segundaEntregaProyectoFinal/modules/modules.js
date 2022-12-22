const mongoose = require("mongoose")

const productos = 'productos'

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 100
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        max: 500
    },
    code: {
        type: String,
        required: true,
        max: 6,
        unique: true
    },
    image: {
        type: String
    },
    stock: {
        type: Number,
        required: true,
        max: 5000
    }
})

 const ProductosModel = mongoose.model(productos, Schema)
 module.exports = {ProductosModel}