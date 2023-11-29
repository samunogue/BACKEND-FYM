import mongoose from "mongoose";

const MusicoSchema = new mongoose.Schema(
        {
        situacao:{type:Boolean, required:true},
        nomeCompleto:{type:String, required:true},
        CPF:{type:String, required:true},        
        email:{type: String, required:true},
        senha:{type:String, required:true},
        descricao:{type: String, required:true},
        nota: {type:String},
        endereco:{
                cep:{type:String, required:true},
                logradouro:{type:String, required:true},
                bairro:{type:String, required:true},
                estado:{type:String, required:true},
                cidade:{type:String, required:true},
                numero:{type:String, required:true},
        },
        generos:[],
        favoritos:[],
        conversas:[],
        contratos:[],
        midia:[],
        avaliacoes:[]
        }
)
const musicos_bd = mongoose.model('musicos', MusicoSchema)

export default musicos_bd;
