const mongoose = require('mongoose');

const collectionChat = "chat"

const schemaChat = new mongoose.Schema({
    autor:
        {
            id: String,
            email: String,
        },
    text: String,
})

const models = mongoose.model(collectionChat, schemaChat)

module.exports = models