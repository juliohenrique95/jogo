const mongoose = require("mongoose")
const jogoSchema = require("../models/jogoSchema")
const db = require("../models/jogoModels")

 const exibeTodos = async(req,res)=>{
     try {
         const cadastro = await db()
         res.status(200).send(cadastro)
     } catch (error) {
         res.status(500).send({ message: error.message})
     }
}
        //COM MONGO
const exibeTodos = async(req,res)=>{
    let query = { }
    try {
        const todosBoletims = await boletimSchema.find(query)
        res.status(200).json(todosBoletims)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
        //to do
const exibePorId = async(req,res)=>{
    const cadastro = await db()
    const { id } = req.params
    try {
        const alunoEncontrado = cadastro.find(aluno=>aluno.id==id)
        if (alunoEncontrado==undefined){
            res.status(404).send({message: `Não foi encontrado cadastro para ID ${id}`})
        }
        res.status(200).send(alunoEncontrado)
    } catch (error) {
        res.status(500).send({ message: error.message})
    }
}
        //to do
const exibeNotas = async(req,res)=>{
    const cadastro = await db()
    const { id } = req.params
    try {
        const alunoEncontrado = cadastro.find(aluno=>aluno.id==id)
        let notas = alunoEncontrado.boletim
        let {
            matematica,portugues,historia,ingles
        } = notas
        let resultado = []
        const aproReprov = []
        for (let nota in notas){
            if (notas[nota]>=7) resultado.push("Aprovado")
            else if (notas[nota]==0) resultado.push("Sem Nota")
            else resultado.push("Reprovado")
        }
        let resultadoFinal = {
            nome: alunoEncontrado.nome,
            boletim: {
                matematica: resultado[0],
                portugues: resultado[1],
                historia: resultado[2],
                ingles: resultado[3]
            }
        }
        res.status(200).send(resultadoFinal)
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

// const criaCadastro = async(req,res)=>{
//     const cadastro = await db()
//     const { nome, boletim } = req.body[0]
//     try {
//         if(nome==undefined) res.status(400).send({message: "O campo 'nome' é obrigatório"})
//         const novoCadastro = {id: crypto.randomUUID(),nome:nome, boletim:boletim}
//         cadastro.push(novoCadastro)
//         res.status(200).send(novoCadastro)
//     } catch (error) {
//         res.status(500).send({message: error.message})
//     }
// }
        //COM MONGO
const criaCadastro = async(req,res)=>{
    try {
        const { nome, boletim } = req.body[0]
        const boletimNovo = new boletimSchema({
            nome: nome,
            boletim: {
                matematica: boletim.matematica,
                portugues: boletim.portugues,
                historia:boletim.historia,
                ingles: boletim.ingles
            }
        })
        const salvarBoletim = await boletimNovo.save()
        res.status(201).json({
            boletim: salvarBoletim
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// const alteraCadastro = async(req,res)=>{
//     const cadastro = await db()
//     const { id } = req.params
//     const { nome, boletim } = req.body[0]
//     try {
//         const alunoEncontrado = cadastro.find(aluno=>aluno.id==id)
//         if(alunoEncontrado==undefined) return res.status(404).send({message:
//             `Não foi encontrado cadastro para ID ${id}`})
//         if(nome) alunoEncontrado.nome=nome
//         if(boletim.matematica) alunoEncontrado.boletim.matematica=boletim.matematica
//         if(boletim.portugues) alunoEncontrado.boletim.portugues=boletim.portugues
//         if(boletim.historia) alunoEncontrado.boletim.historia=boletim.historia
//         if(boletim.ingles) alunoEncontrado.boletim.ingles=boletim.ingles
//         res.status(200).send({message: "Cadastro alterado com sucesso"})
//     } catch (error) {
//         res.status(500).send({message: error.message})
//     }
// }
        //COM MONGO
const alteraCadastro = async(req,res)=>{
    const boletimEncontrado = await boletimSchema.findById(req.params.id)
    const { nome, boletim } =req.body[0]
    if (!boletimEncontrado){
        return res.status(404).send({
            message: "não encontrado"
        })
    }
    if(nome) boletimEncontrado.nome=nome
    if(boletim.matematica) boletimEncontrado.boletim.matematica=boletim.matematica
    if(boletim.portugues) boletimEncontrado.boletim.portugues=boletim.portugues
    if(boletim.historia) boletimEncontrado.boletim.historia=boletim.historia
    if(boletim.ingles) boletimEncontrado.boletim.ingles=boletim.ingles
    const salvarBoletim = await boletimEncontrado.save()
    res.status(200).json({boletimEncontrado: salvarBoletim})
}

// const deletaCadastro = async(req,res)=>{
//     const cadastro = await db()
//     const { id } = req.params
//     try {
//         const alunoIndex = cadastro.findIndex(aluno=>aluno.id==id)
//         if(alunoIndex==-1) return res.status(404).send({message:
//         `Não foi encontrado cadastro para ID ${id}`})
//         cadastro.splice(alunoIndex,1)
//         res.status(200).send({
//             message: `Cadastro deletado`
//         })
//     } catch (error) {
//         res.status(500).send({message: error.message})
//     }
// }
        //COM MONGO
const deletaCadastro = async(req,res)=>{
    try {
        const boletimBusca = await boletimSchema.findById(req.params.id)
        await boletimBusca.deleteOne()
        res.status(200).json({
            message: "deletado"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports={
    exibeTodos,
    exibePorId,
    exibeNotas,
    criaCadastro,
    alteraCadastro,
    deletaCadastro
}