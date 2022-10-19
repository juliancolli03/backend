class Persona{
    constructor(nombre,dni,genero,edad){
        this.nombre=nombre;
        this.dni=dni;
        this.genero=genero;
        this.edad=edad
    }
    
}

let persona1= new Persona("Julian",32323,"masculino",22)
let personas=[]

personas.push(persona1)
console.log(personas)