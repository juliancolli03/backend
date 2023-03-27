const chatDao = require("../container/chatDAO")
const opcion = process.argv[2] || 'Normal'

let dao
switch (opcion) {    
    default:
    dao = new chatDao()
}

module.exports= class chatDaoFactory {
    static getDao() {
        return dao
    }
}