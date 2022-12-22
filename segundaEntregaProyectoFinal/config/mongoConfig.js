const mongoose = require("moongose")

const URL = "mongodb://localhost:27017/productos"
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})