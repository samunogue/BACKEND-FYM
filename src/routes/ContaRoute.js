import express from "express";
import { ContaController } from "../controllers/ContaController.js";

const router = express.Router();

router
        .post('/v1/conta/loginContratante', ContaController.loginContratante)
        .post('/v1/conta/loginMusico', ContaController.loginMusico)
        .post('/v1/conta/redefinirSenhaContratante', ContaController.redefinirSenhaContratante)
        .post('/v1/conta/redefinirSenhaMusico', ContaController.redefinirSenhaMusico)
        .post('/v1/conta/enviarMensagem', ContaController.enviarMensagem)

export default router