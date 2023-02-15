
const { Router } = require('express')

const argumentosEntr = process.argv.slice(2)
const Plataforma = process.platform
const Version = process.version
const Memoria = process.memoryUsage().rss
const Path = process.execPath
const Id = process.pid
const Carpeta = process.cwd()
const os = require('os')
const nucleos = os.cpus().length
const datos = {
    argumentosEntr: argumentosEntr,
    Pltataforma: "Sistema operativo " + Plataforma,
    Version: "Version de node " +Version,
    Memoria: "Memoria total usada" +Memoria,
    Path: "Path de ejecucion " +Path,
    Id: "Id del proceso actual de trabajo" +Id,
    Carpeta: "Carpeta actual del proyecto"+ Carpeta,
    Nucleos: "nucleos" + nucleos
}

const info = Router();

info.get("/", (req, res) => {
    res.json(datos)
    console.log(datos)
});

module.exports=info
