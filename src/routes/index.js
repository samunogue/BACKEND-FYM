import express from "express";
import contratantes_route from './ContratantesRoutes.js'
import musicos_route from './MusicosRoute.js'
import conta_route from './ContaRoute.js'

const routes = (app) =>{
        app.get('/',(req,res)=>{
                res.status(200).send({message: "Bem vindo a API do FYM"})
        })
        app.use(
                express.json(),
                contratantes_route,
                musicos_route,
                conta_route
                
        )
}
export default routes