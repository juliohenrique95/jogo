const mongoose = require("mongoose");
const { put } = require("../routes/jogoRoutes");

const jogoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    }
});
module.exports=mongoose.model("jogo", jogoSchema)