const pino = require("pino")

function defaultLogger() {
    const defaultLogger = pino("todo.log")
    defaultLogger.level = "info"
    return defaultLogger
}

function wariningLog() {
    const prodLogger = pino('warning.log')
    prodLogger.level = 'warn'
    return prodLogger
}
function errorLog() {
    const prodLogger = pino('error.log')
    prodLogger.level = 'error'
    return prodLogger
}

let error = errorLog()
let peligro= wariningLog()
let todos = defaultLogger()
module.exports={todos,peligro,error}

