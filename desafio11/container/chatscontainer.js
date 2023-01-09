const knex = require('knex');

class ClienteSQL {

    constructor(options) {
        this.knex = knex(options)
    }

    crearTabla() {
        this.knex.schema.dropTableIfExists('chat')
            .then(() => {
                return this.knex.schema.createTable('chat', table => {
                    
                    table.string('texto', 20).notNullable()
                    table.string('email').notNullable()
                    table.string("time").notNullable()      
                })
            .catch(() => {
                console.log("ya existe")
            })
        })
}

    insertarArticulos(articulos) {
        return this.knex('chat').insert(articulos)
    }

    listarArticulos() {
        return this.knex('chat').select('*')
    }

    borrarArticulos(id) {
        return this.knex.from('chat').where('id', '=', id).del()
    }

    actualizarStock(obj, id) {
        return this.knex.from("chat").where('id', '=', id).update({obj})
    }

    close() {
        this.knex.destroy()
    }
}

module.exports = ClienteSQL