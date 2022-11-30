const fs = require('fs')
// import fs from "fs"

class Container {
  constructor(name) {
    this.name = name
  }

  async save(obj) {
    try {
      const newObject = obj
      newObject.id = 1
      
//Si el archivo no existe, esto lleva la ejecución al catch'
      let info = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
      if (info !== '') {
        info = JSON.parse(info)
        const ids = info.map((el) => el.id)
        const lastId = Math.max(...ids)
        newObject.id = lastId === -Infinity ? 1 : lastId + 1
      } else {
        info = []
      }
      info.push(newObject)
      await fs.promises.writeFile(
        `./${this.name}.txt`,
        JSON.stringify(info, null, 2),
      )
      return newObject.id
    } catch (error) {
      const newObject = obj
      newObject.id = 1
      await fs.promises.writeFile(
        `./${this.name}.txt`,
        JSON.stringify([newObject], null, 2),
      )
      return newObject.id
    }
  }

  async getById(id) {
    try {
      
//Si el archivo no existe, esto lleva la ejecución al catch'
      let info = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
      if (info !== '') {
        info = JSON.parse(info)
        const item = info.find((el) => el.id === id) || null
        return item !== null ? item : 'el objeto no existe '
      } else {
        
        return 'el archivo esta vacio   '
      }
    } catch (error) {
      return 'el archivo no existe'
    }
  }

  async getAll() {
    try {

//Si el archivo no existe, esto lleva la ejecución al catch'
      let info = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
      if (info !== '') {
        return JSON.parse(info)
      } else {
        return 'el archivo esta vacio  '
      }
    } catch (error) {
      return 'El archivo no existe o contiene datos no válidos'
    }
  }

  async deleteById(id) {
    try {

//Si el archivo no existe, esto lleva la ejecución al catch'
        let info = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
      if (info !== '') {
        info = JSON.parse(info)
        if (info.find((el) => el.id === id) === undefined) {
          console.log(`El objeto con el id ${id}, no existe`)
          return
        }
        const newList = info.filter((el) => el.id !== id)
        await fs.promises.writeFile(
          `./${this.name}.txt`,
          JSON.stringify(newList, null, 2),
        )
        console.log(`el objeto con el id ${id}, fue eliminado`)
      } else {
        console.log('el archivo esta vacio')
      }
    } catch (error) {
      console.log('el archivo no existe')
    }
  }

  async deleteAll() {
    try {

//Si el archivo no existe, esto lleva la ejecución al catch'
        await fs.promises.readFile(`./${this.name}.txt`)
      await fs.promises.writeFile(`./${this.name}.txt`, '')
      console.log('Todos los objetos se han eliminado con éxito')    } 
      catch (error) {
      console.log(`El archivo con el nombre ${this.name}.txt, no existe`)
    }
  }
}

// Create a new container
// const products = new Container('productss')

// // Create test data
// const iphoneX = {
//   title: 'Iphone X',
//   price: 700,
//   thumbnail: 'https://cdn-icons-png.flaticon.com/512/1088/1088537.png',
// }
// const iphone11 = {
//   title: 'Iphone 11',
//   price: 800,
//   thumbnail: 'https://cdn-icons-png.flaticon.com/512/1088/1088537.png',
// }
// const iphone12 = {
//   title: 'Iphone 12',
//   price: 900,
//   thumbnail: 'https://cdn-icons-png.flaticon.com/512/1088/1088537.png',
// }
// const iphone13 = {
//   title: 'Iphone 13',
//   price: 1000,
//   thumbnail: 'https://cdn-icons-png.flaticon.com/512/1088/1088537.png',
// }

// // Hemos creado esta función para probar todos los métodos de la clase Container,
// // es una función de espera asíncrona porque los métodos devuelven promesas y necesitamos
// // esperar hasta que se resuelvan las promesas para verificar los resultados
// const prueba = async () => {
//   const iphoneXID = await products.save(iphoneX)
//   console.log(iphoneXID)
//   const iphone11ID = await products.save(iphone11)
//   console.log(iphone11ID)
//   const iphone12ID = await products.save(iphone12)
//   console.log(iphone12ID)
//   const iphone13ID = await products.save(iphone13)
//   console.log(iphone13ID)

//   const product2 = await products.getById(2)
//   console.log(product2)

//   const product10 = await products.getById(10)
//   console.log(product10)

//   const allProducts = await products.getAll()
//   console.log(allProducts)

//   await products.deleteById(4)
//   await products.deleteById(12)

//   // await products.deleteAll()

//   const allProductsEmpty = await products.getAll()
//   console.log(allProductsEmpty)
// }

// prueba()

// // desafio 3
// const express = require("express")

// const app = express()

// app.get("/productoRandom", (req, res) => {
//   products
//     .getAll()
//     .then((data) => {
//       const random = Math.floor(Math.random() * data.length);
//       res.send(data[random]);
//     })
//     .catch((error) => {
//       res.send(console.log("error"+error));
//     })
// });

// app.get("/productos", (req, res) =>{
   
//   products
//   .getAll()
//   .then((data) => res.send(data))
//   .catch((error) => {
//     res.send(console.log("error"+error));
//   })

// })

// const server =app.listen(8080,() =>{
//   console.log("andando 0km")
// })

// server.on("error", error=> console.log("hubo un eror +", error))

 module.exports = Container

// export default Container