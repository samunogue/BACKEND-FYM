import mongoose from "mongoose";

const ConversaSchema = new mongoose.Schema(
        {
        usuarios:[],
        mensagens:[]
        }
)
const conversas_bd = mongoose.model('chat', ConversaSchema)

export default conversas_bd;
