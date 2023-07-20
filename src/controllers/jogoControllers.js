const mongoose = require("mongoose")
const jogoSchema = require("../models/jogoSchema")

const getAllJogos = async(req,res)=>{
    let query = { }
    try {
        const todosResultados= await jogoSchema.find(query)
        res.status(200).json({
            message: "Todos os Jogos",
            resultados: todosResultados})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const createJogo = async(req,res)=>{
    try {
        const { nome, categoria, preco } = req.body
        const novoJogo = new jogoSchema({
            nome: nome,
            categoria: categoria,
            preco: preco
        })
        const salvaJogo = await novoJogo.save()
        res.status(201).json({
            message: "Jogo Cadastrado",
            novoJogo: salvaJogo
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

const updateJogo = async(req,res)=>{
    const { nome, categoria, preco } =req.body
    try {
        const atualizaJogo = await jogoSchema.findById(req.params.id)
    if (!atualizaJogo){
        return res.status(404).send({
            message: "jogo não encontrado"
        })
    }
    if(nome) atualizaJogo.nome=nome
    if(categoria) atualizaJogo.categoria=categoria
    if(preco) atualizaJogo.preco=preco
    const salvarJogo = await atualizaJogo.save()
    res.status(200).json({
        message: "Jogo Atualizado",
        atualizaJogo: salvarJogo})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteJogo = async(req,res)=>{
    try {
        const deletarJogo = await jogoSchema.findById(req.params.id)
        await deletarJogo.deleteOne()
        res.status(200).json({
            message: "Jogo Deletado"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports={
    getAllJogos,
    createJogo,
    updateJogo,
    deleteJogo
}