const knex = require('knex');

class ClienteSQL {

    constructor(options) {
        this.knex = knex(options)
    }

    crearTabla() {
        this.knex.schema.hasTable('prodlist')
            .then(() => {
                return this.knex.schema.createTable('prodlist', table => {
                    table.increments('id').primary()
                    table.string('title', 20).notNullable()
                    table.float('price').notNullable()
                    table.string('thumbnail', 30).notNullable()
                })
            .catch(() => {
                console.log("ya existe")
            })
        })
}

    insertarArticulos(articulos) {
        return this.knex('prodlist').insert(articulos)
    }

    listarArticulos() {
        return this.knex('prodlist').select('*')
    }

    borrarArticulos(id) {
        return this.knex.from('prodlist').where('id', '=', id).del()
    }

    actualizarStock(obj, id) {
        return this.knex.from("prodlist").where('id', '=', id).update({obj})
    }

    close() {
        this.knex.destroy()
    }
}

module.exports = ClienteSQL