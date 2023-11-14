import express from "express";
import ContratantesController from "../controllers/ContratantesController.js";

const router = express.Router();

router
        .get('/v1/contratante', ContratantesController.buscarContratante)
        .post('/v1/contratante', ContratantesController.cadastrarContratante)
        .put('/v1/contratante', ContratantesController.editarContratante)
        .delete('/v1/contratante', ContratantesController.excluirContratante)

export default router