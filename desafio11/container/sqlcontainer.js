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
                    table.string('username', 20).notNullable()
                    table.float('precio').notNullable()
                    table.string('text', 30).notNullable()
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