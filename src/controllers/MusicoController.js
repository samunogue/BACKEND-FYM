import musicos_bd from "../models/MusicoModel.js";

export class MusicoController {
  static buscarMusico = async (req, res) => {
    const id = req.query.id;
    const nome = req.query.nome
    const genero = req.query.genero
    if (id != undefined) {
      try {
        const user = await musicos_bd.findById(id).exec()
        if (user == null) {
          res.status(404).send({ error: true, mensagem: "Músico não encontrado" });
        } else {
          res.status(200).send(user);
        }
      } catch {
        res.status(404).send({ error: true, mensagem: "Músico não encontrado" });
      }
    }else if(nome != undefined){
      try {
        const musico = await musicos_bd.find({ nomeCompleto: { $regex: new RegExp(nome, 'i') } });
      
        if (musico.length === 0) {
          res.status(404).send({ error: true, mensagem: "Músico não encontrado" });
        } else {
          res.status(200).send(musico);
        }
      } catch (error) {
        res.status(500).send({ error: true, mensagem: "Erro na busca do músico" });
      }
    }else if(genero != undefined){
        try {
            const musicos = await musicos_bd.find({ generos: { $in: [genero] } });
        
            if (musicos.length === 0) {
              return res.status(404).json({ message: 'Nenhum músico encontrado com esse gênero.' });
            }
        
            res.status(200).json(musicos);
          } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar músicos por gênero.' });
          }
    }else {
      try {
        const musicos = await musicos_bd.find();
        if (!musicos) {
          res.status(404).send({ error: true, mensagem: "Musicos não encontrado" });
        } else {
          res.status(200).send(musicos);
        }
      } catch {
        res.status(404).send({ error: true, mensagem: "Musicos não encontrado" });
      }
    }
  }
  static cadastrarMusico = async (req, res) => {
    const user = new musicos_bd(req.body)
    try {
      const verificarUser = await musicos_bd.find({ "CPF": req.body.CPF })
      if (verificarUser.length > 0) {
        res.status(400).send({ error: true, message: "Músico ja cadastrado" })
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

  static editarMusico = async (req, res) => {
      const CPF = req.query.cpf;
      const body = req.body 
      const query = { CPF: CPF };

      try {
          const musico = await musicos_bd.findOne(query);
          if (musico) {
              const resultado = await musicos_bd.findOneAndUpdate(query, { $set: body }, { new: true })
              res.status(200).send({ error: false, user: resultado })
          } else {
              res.status(404).send({ error: true, message: "Músico não encontrado" });
          }
      } catch (error) {
          res.status(400).send({ error: true, message: "Erro ao editar usuário" });
      }
  }
  static excluirMusico = async (req, res) => {
    const CPF = req.query.cpf;
    const query = { CPF: CPF };
    try {
      const musico = await musicos_bd.findOne(query);
      if (musico) {
        const excluir = await musicos_bd.findOneAndDelete(query);
        res.status(200).send({ error: false, user: excluir });
      } else {
        res.status(404).send({ error: true, message: "Usuário não encontrado" });
      }
    } catch (error) {
      res.status(400).send({ error: true, message: "Erro ao excluir usuário" });
    }
  }
  static favoritarMusico = async (req, res) => {
    const idMusico = req.body.idMusico;
    const idMusicoFavoritado = req.body.idMusicoFavoritado
    
    try {
      const musico = await musicos_bd.findOne({_id: idMusico})
      const musicoFavoritado = await musicos_bd.findOne({ _id: idMusicoFavoritado });
      if (musico && musicoFavoritado) {
        var verificacao = false
        musico.favoritos.forEach(item =>{
          if(item.id == musicoFavoritado.id){
            res.status(200).send({ error: true, message: "Músico ja adicionado" })
            verificacao = true
          }
        })
        if(verificacao == false){
          musico.favoritos.push({
            id:musicoFavoritado.id,
            nomeCompleto:musicoFavoritado.nomeCompleto,
            descricao:musicoFavoritado.descricao,
            generos: musicoFavoritado.generos,
            nota:musicoFavoritado.nota
          })
          musico.save()
          res.status(200).send({ error: false, user: musico });
        }
      } else {
        res.status(200).send({ error: true, message: "Usuário não encontrado" });
      }
    } catch (error) {
      res.status(400).send({ error: true, message: "Erro ao favoritar músico" });
    }
  }
  
}
