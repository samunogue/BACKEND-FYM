import contratantes_bd from "../models/ContratantesModel.js";
import conversas_bd from "../models/ConversasModel.js";
import musicos_bd from "../models/MusicoModel.js";

export class ContaController {
    static loginContratante = async (req, res) =>{
        const login = req.body.login;
        const senha = req.body.senha
        const query = { email: login, senha:senha }
        try {
        const contratante = await contratantes_bd.findOne(query);
        if (contratante) {
            res.status(200).send({ error: false, user: contratante });
        } else {
            res.status(200).send({ error: true, message: "Credenciais Inválidas" });
        }
        } catch (error) {
            res.status(500).send({ error: true, message: "Erro no servidor" });
        }
    }
    static loginMusico = async (req, res) =>{
        const login = req.body.login;
        const senha = req.body.senha
        const query = { email: login, senha:senha }
        try {
        const musico = await musicos_bd.findOne(query)
        if (musico) {
            res.status(200).send({ error: false, user: musico });
        } else {
            res.status(200).send({ error: true, message: "Credenciais Inválidas" });
        }
        } catch (error) {
            res.status(500).send({ error: true, message: "Erro no servidor" });
        }
    }
    static redefinirSenhaContratante = async (req, res) =>{
        const cpf = req.body.cpf;
        const email = req.body.email
        const query = { email: email}
        try {
        const contratante = await contratantes_bd.findOne(query)
        if (contratante) {
            if(contratante.CPF != cpf){
                res.status(200).send({error: true, message:"Credenciais Inválidas"})
                return
            }
            contratante.senha = req.body.senha
            contratante.save()
            res.status(200).send({ error: false, user: contratante });
        } else {
            res.status(200).send({ error: true, message: "Credenciais Inválidas" });
        }
        } catch (error) {
            res.status(500).send({ error: true, message: "Erro no servidor" });
        }
    }
    static redefinirSenhaMusico = async (req, res) =>{
        const cpf = req.body.cpf;
        const email = req.body.email
        const query = { email: email}
        try {
        const musico = await musicos_bd.findOne(query)
        if (musico) {
            if(musico.CPF != cpf){
                res.status(200).send({error: true, message:"Credenciais Inválidas"})
                return
            }
            musico.senha = req.body.senha
            musico.save()
            res.status(200).send({ error: false, user: musico });
        } else {
            res.status(200).send({ error: true, message: "Credenciais Inválidas" });
        }
        } catch (error) {
            res.status(500).send({ error: true, message: "Erro no servidor" });
        }
    }
    static avaliarMusico = async (req, res) =>{
        const idMusico = req.body.idMusico
        const avaliacao = req.body.avaliacao
        try {
        const musico = await musicos_bd.findById(idMusico)
        if (musico) {
            musico.avaliacoes.push(avaliacao)
            musico.save()
            res.status(200).send({ error: false, avaliacao: avaliacao });
        } else {
            res.status(200).send({ error: true, message: "Músico não encontrado" });
        }
        } catch (error) {
            res.status(500).send({ error: true, message: "Erro no servidor" });
        }
    }
}
