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
    static buscarConversas = async (req,res) =>{
        try {
            const idUser = req.query.id
            const conversas = await conversas_bd.find({
                usuarios: idUser
              });
            if (conversas.length == 0) {
              res.status(200).send({ error: true, mensagem: "Conversa não encontrado" });
            } else {
              res.status(200).send(conversas);
            }
          } catch {
            res.status(404).send({ error: true, mensagem: "Conversa não encontrado" });
          }
    }
    static criarConversa = async (req, res) =>{
        const idUserRemetente = req.body.idUserRemetente
        const tipoRemetente = req.body.tipoRemetente
        const idUserDestinatario = req.body.idUserDestinatario
        const tipoDestinatario = req.body.tipoDestinatario

        try{
            var remetente = ""
            if(tipoRemetente == 'musico')  remetente = await musicos_bd.findById(idUserRemetente)
            if(tipoRemetente == 'contratante')  remetente = await contratantes_bd.findById(idUserRemetente)
            var destinatario = ""
            if(tipoDestinatario == 'musico') destinatario = await musicos_bd.findById(idUserDestinatario)
            if(tipoDestinatario == 'contratante')  destinatario = await contratantes_bd.findById(idUserDestinatario)

            if(remetente && destinatario){
                var conversas = await conversas_bd.find()
                var conversaExiste = false
                conversas.forEach(element => {
                    var conversa = element
                    if(conversa.usuarios.includes(remetente.id) == true && conversa.usuarios.includes(destinatario.id) == true ){
                        conversaExiste = true
                        res.status(200).send({ error: true, message:"Conversa ja existe" })
                    }
                })
                if(conversaExiste == false){
                    var conversa = {
                        usuarios:[remetente.id,destinatario.id],
                        mensagens:[]                    
                    }
                    const novaConversa = new conversas_bd(conversa)
                    novaConversa.save()
                    res.status(200).send({ error: false, conversa: novaConversa })
                    return
                }
            }
        }catch{
            res.status(500).send({ error: true, message: "Erro no servidor" });
        }

    }
    static enviarMensagem = async (req, res) =>{
        const idUserRemetente = req.body.idUserRemetente
        const tipoRemetente = req.body.tipoRemetente
        const idUserDestinatario = req.body.idUserDestinatario
        const tipoDestinatario = req.body.tipoDestinatario
        const mensagem = req.body.mensagem
        try {
        var remetente = ""
        if(tipoRemetente == 'musico')  remetente = await musicos_bd.findById(idUserRemetente)
        if(tipoRemetente == 'contratante')  remetente = await contratantes_bd.findById(idUserRemetente)
        var destinatario = ""
        if(tipoDestinatario == 'musico') destinatario = await musicos_bd.findById(idUserDestinatario)
        if(tipoDestinatario == 'contratante')  destinatario = await contratantes_bd.findById(idUserDestinatario)

        if (remetente && destinatario) {
            var conversas = await conversas_bd.find()
            if(conversas == null){
                var conversa = {
                    usuarios:[remetente.id,destinatario.id],
                    mensagens:[{
                        user:remetente.id,
                        texto:mensagem
                    }]                    
                }
                const novaConversa = new conversas_bd(conversa)
                novaConversa.save()
                res.status(200).send({ error: false, conversa: novaConversa })
                return
            }
            var conversaExiste = false
            conversas.forEach(element => {
                var conversa = element
                if(conversa.usuarios.includes(remetente.id) == true && conversa.usuarios.includes(destinatario.id) == true ){
                    conversaExiste = true
                    conversa.mensagens.push({
                        user:remetente.id,
                        texto:mensagem
                    })
                    conversa.save()
                    res.status(200).send({ error: false, conversa: conversa })
                }
            })
            if(conversaExiste == false){
                var conversa = {
                    usuarios:[remetente.id,destinatario.id],
                    mensagens:[{
                        user:remetente.id,
                        texto:mensagem
                    }]                    
                }
                const novaConversa = new conversas_bd(conversa)
                novaConversa.save()
                res.status(200).send({ error: false, conversa: novaConversa })
                return
            }
        } else {
            res.status(200).send({ error: true, message: "User não encontrado" })
        }
        } catch (error) {
            res.status(500).send({ error: true, message: "Erro no servidor" });
        }
    }
}
