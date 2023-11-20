import express from "express";
import { MusicoController } from "../controllers/MusicoController.js";

const router = express.Router();

router
        .get('/v1/musico', MusicoController.buscarMusico)
        .post('/v1/musico', MusicoController.cadastrarMusico)
        .post('/v1/musico/favoritarMusico', MusicoController.favoritarMusico)
        .put('/v1/musico', MusicoController.editarMusico)
        .delete('/v1/musico', MusicoController.excluirMusico)

export default router