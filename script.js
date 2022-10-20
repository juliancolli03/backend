class Usuario{
    constructor(nombre,apellido,libros,mascotas){
        this.nombre=nombre;
        this.apellido=apellido;
        this.libros=libros;
        this.mascotas=mascotas
    }
    getFullName(){
       console.log(`Nombre completo ${this.nombre} ${this.apellido}`)
    }
    addMascota(mascota){
        this.mascotas.push(mascota)
    }

    countMascotas(){
        console.log(this.mascotas.length)
    }

    addBook(nombre, autor){
        this.libros.push(nombre,autor)
    }
    getBookNames(){
        this.libros.forEach(element => {
            console.log(`${element.nombre}`);
        });        

    }
}

let usuario1= new Usuario("Julian","Colli",[{nombre:"Libro uno",autor:"borges"}],["gato"])

console.log(usuario1)
usuario1.getFullName()
usuario1.addMascota("perro")
usuario1.countMascotas()
usuario1.addBook({nombre:"Mecanica del automotor", autor:"vicesat"})
usuario1.getBookNames()
console.log(usuario1)