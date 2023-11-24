import express from "express";
import ContratantesController from "../controllers/ContratantesController.js";

const router = express.Router();

router
        .get('/v1/contratante', ContratantesController.buscarContratante)
        .post('/v1/contratante', ContratantesController.cadastrarContratante)
        .post('/v1/contratante/favoritarMusico', ContratantesController.favoritarMusico)
        .post('/v1/contratante/cadastrarContrato', ContratantesController.cadastrarContrato)
        .post('/v1/contratante/genero', ContratantesController.adicionarGenero)
        .put('/v1/contratante', ContratantesController.editarContratante)
        .delete('/v1/contratante/genero', ContratantesController.removerGenero)
        .delete('/v1/contratante', ContratantesController.excluirContratante)

export default router