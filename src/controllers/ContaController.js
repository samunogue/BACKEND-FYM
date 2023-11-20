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
        const query = { email: email, cpf:cpf}
        try {
        const contratante = await contratantes_bd.findOne(query)
        if (contratante) {
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
        const query = { email: email, cpf:cpf}
        try {
        const musico = await musicos_bd.findOne(query)
        if (musico) {
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
}
