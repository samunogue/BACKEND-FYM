import contratantes_bd from "../models/ContratantesModel.js";
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
    static enviarMensagem = async (req, res) =>{
        const idRemetente = req.body.idRemetente
        const tipoRemetente = req.body.tipoRemetente
        const idDestinatario = req.body.idDestinatario
        const tipoDestinatario = req.body.tipoDestinatario
        const mensagem = req.body.mensagem

        var remetente = null
        if(tipoRemetente == 'contratante') remetente = await contratantes_bd.findById(idRemetente)
        if(tipoRemetente == 'musico') remetente = await musicos_bd.findById(idRemetente)
        var destinatario = null
        if(tipoDestinatario == 'contratante') destinatario = await contratantes_bd.findById(idDestinatario)
        if(tipoDestinatario == 'musico') destinatario = await musicos_bd.findById(idDestinatario)

        console.log(remetente)
        console.log(destinatario)
        try {
        if (remetente && destinatario) {
            remetente.conversas.push(
                {
                    remetente:idRemetente,
                    mensagem:mensagem,
                    data:  new Date()
                }
            )
            remetente.save()
            destinatario.conversas.push(
                {   
                    remetente:idRemetente,
                    mensagem:mensagem,
                    data:  new Date()
                }
            )
            destinatario.save()
            res.status(200).send({ error: false, message: "Mensagem Adicionada" });
            
        } else {
            res.status(200).send({ error: true, message: "Usuários não encontrado" });
        }
        } catch (error) {
            res.status(500).send({ error: true, message: "Erro no servidor" });
        }
    }
}
