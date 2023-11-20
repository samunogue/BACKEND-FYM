import mongoose from "mongoose";

const ContratanteSchema = new mongoose.Schema(
        {
        situacao:{type:Boolean, required:true},
        nomeCompleto:{type:String, required:true},
        CPF:{type:String, required:true},        
        email:{type: String, required:true},
        senha:{type:String, required:true},
        endereco:{
                cep:{type:String, required:true},
                logradouro:{type:String, required:true},
                bairro:{type:String, required:true},
                estado:{type:String, required:true},
                cidade:{type:String, required:true},
                numero:{type:String, required:true},
        },
        favoritos:[],
        generos:[],
        conversas:[
                {
                        pessoas:[],
                        mensagens:[
                                {
                                        autor:{type:String},
                                        texto:{type:String},
                                        data:{type:String}
                                }
                        ]

                }
        ],
        contratos:[
                {
                        pessoas:[
                                {
                                        idUser:{type:String}
                                }
                        ],
                        termo:{type:String},
                }
        ]
        }
)
const contratantes_bd = mongoose.model('contratantes', ContratanteSchema)

export default contratantes_bd;
