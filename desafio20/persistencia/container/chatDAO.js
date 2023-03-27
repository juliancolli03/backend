const mongoose = require('mongoose');
const modelsChat = require("../models/modelsChat")
const dotenv = require("dotenv")
const formatDTO = require("../dto/chatDTO")
dotenv.config();
const MONGO = process.env.DBNUBE;

mongoose.set('strictQuery', false);
mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
   
});


class Container {
    
    async getChat(){
        const data = await modelsChat.find({}, {_id:0, __v:0})
        return formatDTO(data)
    }

    async addChat(data){
        const dataAdd = new modelsChat(data)
        const add = await dataAdd.save()
        return formatDTO(add)
    }
}

module.exports = Container;