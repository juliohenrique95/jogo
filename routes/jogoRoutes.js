const express = require("express")
const rotas = express.Router()
const jogoControllers= require("../controllers/jogoControllers")

rotas.get("/lista", jogoControllers.exibeTodos)
rotas.get("/id/:id", jogoControllers.exibePorId)
rotas.get("/jogo/:id", jogoControllers.exibeCategoria)
rotas.get("/jogo/:id", jogoControllers.exibeNome)

rotas.post("/criar", jogoControllers.criaCadastro)
rotas.patch("/alterar/:id", jogoControllers.alteraCadastro)
rotas.delete("/deletar/:id", jogoControllers.deletaCadastro)

module.exports=rotas
