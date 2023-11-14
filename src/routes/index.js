import express from "express";
import contratantes_route from './ContratantesRoutes.js'
import musicos_route from './MusicosRoute.js'

const routes = (app) =>{
        app.get('/',(req,res)=>{
                res.status(200).send({message: "Bem vindo a API do FYM"})
        })
        app.use(
                express.json(),
                contratantes_route,
                musicos_route
                
        )
}
export default routes