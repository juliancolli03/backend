const fs = require('fs')

class Contenedor {

    constructor(nombre){
        this.nombre = nombre
    }

    async save (obj) {
        try {
            const producto = await fs.promises.readFile(`./${this.nombre}.txt`, 'utf-8');
            const archivoParse = JSON.parse(producto);
            const ultimoId = archivoParse.length
            archivoParse.push({...obj, id: ultimoId + 1 });
            fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify(archivoParse, null , 2))
            return `Se creo exitosamente el nuevo producto: ${JSON.stringify(obj)}. con el id: ${ultimoId + 1}`
        } catch (error) {
            fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify([{...obj, id:1}], null , 2))
            return `Se creo exitosamente el nuevo producto: ${JSON.stringify(obj)}. con el id: 1`
        }      
    }

    async getById (id) {
        try {
            const producto = await fs.promises.readFile(`./${this.nombre}.txt`, 'utf-8');
            const archivoParse = JSON.parse(producto);
            const productoEncontrado = archivoParse.find(archivo => archivo.id === id)
            return productoEncontrado? productoEncontrado : "producto no encontrado o inexistente"
        } catch (error) {
            return "El archivo no existe, no hay productos"
        }
        
    }

    async getAll () {
        try {
            const producto = await fs.promises.readFile(`./${this.nombre}.txt`, 'utf-8');
            const archivoParse = JSON.parse(producto);
            return archivoParse
        } catch (error) {
            return "El archivo no existe, no hay productos"
        }
    }

    async update (id, obj) {
        try {
            const producto = await fs.promises.readFile(`./${this.nombre}.txt`, 'utf-8');
            const archivoParse = JSON.parse(producto);
            let productoEncontrado = archivoParse.find(archivo => archivo.id === id)
            if (productoEncontrado) {
                let nuevoArray = archivoParse.filter(archivo => archivo.id !== id)
                productoEncontrado = {...obj, id: id}
                nuevoArray.push(productoEncontrado)
                fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify(nuevoArray, null , 2))
                return `Se actualizo exitosamente el producto ${JSON.stringify(productoEncontrado)}`
            }else{
                return "No se encontro el producto"
            }
        } catch (error) {
            return "El archivo no existe, no hay productos"
        }
    }

    async deleteById (id) {
        try {
            const producto = await fs.promises.readFile(`./${this.nombre}.txt`, 'utf-8');
            const archivoParse = JSON.parse(producto)
            const productoEncontrado = archivoParse.find(archivo => archivo.id === id)
            let nuevoArray = archivoParse.filter(archivo => archivo.id !== id)
            fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify(nuevoArray, null, 2))
            return productoEncontrado? 'El producto fue eliminado exitosamente' : 'No fue encontrado el producto'
        } catch (error) {
            return "El archivo no existe, no hay productos"
        }
    }

    async deleteAll () {
        try {
            await fs.promises.readFile(`./${this.nombre}.txt`, 'utf-8')
            fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify([], null, 2))
        } catch (error) {
            return "El archivo no existe, no hay productos"
        }
        
    }
}
const produc = new Contenedor('productos')

const express = require('express')
const { Router } = express
const app = express()
const productos = new Router()
const PORT = 8080


app.use(express.static("public"))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/productos", productos)



productos.get("/", async (req, res) => {
    res.json(await produc.getAll())
})

productos.get("/:id", async (req, res) => {
    const id = req.params.id
    res.json(await produc.getById(parseInt(id)))
})

productos.post("/", async (req, res) => { 
    res.json(await produc.save(req.body))
})

productos.put("/:id", async (req, res) => {
    const id = req.params.id 
    const obj = req.body
    res.json(await produc.update(parseInt(id), obj))
})

productos.delete("/:id", async (req, res) => {
    const id = req.params.id
    res.json(await produc.deleteById(parseInt(id)))
})


const server = app.listen(PORT,()=>{
    console.log("perfecto")


})