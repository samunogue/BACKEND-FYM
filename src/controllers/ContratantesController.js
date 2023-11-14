import contratantes_bd from "../models/ContratantesModel.js"

class ContratantesController {
  static buscarContratante = async (req, res) => {
    const id = req.query.id;
    if (id != undefined) {
      try {
        const user = await contratantes_bd.findById(id).exec()
        if (user == null) {
          res.status(404).send({ error: true, mensagem: "Contratante não encontrado" });
        } else {
          res.status(200).send(user);
        }
      } catch {
        res.status(404).send({ error: true, mensagem: "Contratante não encontrado" });
      }
    } else {
      try {
        const contratantes = await contratantes_bd.find();
        if (!contratantes) {
          res.status(404).send({ error: true, mensagem: "Contratante não encontrado" });
        } else {
          res.status(200).send(contratantes);
        }
      } catch {
        res.status(404).send({ error: true, mensagem: "Contratante não encontrado" });
      }
    }
  }
  static cadastrarContratante = async (req, res) => {
    const user = new contratantes_bd(req.body)
    try {
      const verificarUser = await contratantes_bd.find({ "CPF": req.body.CPF })
      if (verificarUser.length > 0) {
        res.status(400).send({ error: true, message: "Usuário ja cadastrado" })
      } else {
        user.save((error) => {
          if (error) res.status(500).send({ error: true, message: error.message })
          res.status(201).send(user)
        })
      }
    } catch {
      res.status(500).send({ message: "ERRO NO SERVIDOR" })
    }
  }

  static editarContratante = async (req, res) => {
      const CPF = req.query.cpf;
      const body = req.body 
      const query = { CPF: CPF };

      try {
          const contratante = await contratantes_bd.findOne(query);
          if (contratante) {
              const resultado = await contratantes_bd.findOneAndUpdate(query, { $set: body }, { new: true })
              res.status(200).send({ error: false, user: resultado })
          } else {
              res.status(404).send({ error: true, message: "Usuário não encontrado" });
          }
      } catch (error) {
          res.status(400).send({ error: true, message: "Erro ao editar usuário" });
      }
  }
  static excluirContratante = async (req, res) => {
    const CPF = req.query.cpf;
    const query = { CPF: CPF };
    try {
      const contratante = await contratantes_bd.findOne(query);
      if (contratante) {
        const excluir = await contratantes_bd.findOneAndDelete(query);
        res.status(200).send({ error: false, user: excluir });
      } else {
        res.status(404).send({ error: true, message: "Usuário não encontrado" });
      }
    } catch (error) {
      res.status(400).send({ error: true, message: "Erro ao excluir usuário" });
    }
  }
}
export default ContratantesController
