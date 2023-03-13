const { Router } = require('express')
const { fork }= require('child_process');
const path = require("path")

const apiRandom = Router();

apiRandom.get("/", (req, res) => {

    const cantidad = req.query.cant || 800000000;

    const calculo = fork(path.resolve(process.cwd(), './middleware/calculo.js'));
    calculo.on('message', result => {
        if (result == 'listo') {
            calculo.send(cantidad);
        } else {
            res.json(result);
        };
    });
});

module.exports=apiRandom;