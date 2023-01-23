const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/chatt", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('MongoDB Connected');
    }
});


class Container {
    
    async getUsuario(data){
        const usuario = await modelsUsuario.findOne({username: data});
        return usuario;
    };

    async addUsuario(data){
        const dataAdd = new modelsUsuario(data);
        const add = await dataAdd.save();
        return add;
    };
}

module.exports = Container;