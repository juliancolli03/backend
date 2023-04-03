const prodductosDao = require("../container/productosDAO")
const opcion = process.argv[2] || 'Normal'

let dao
switch (opcion) {    
    default:
    dao = new prodductosDao()
}

module.exports= class chatDaoFactory {
    static getDao() {
        return dao
    }
}