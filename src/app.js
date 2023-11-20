import express from "express";
import db from "./config/db_connect.js";
import routes from "./routes/index.js";
import cors from "cors";
import bodyParser from 'body-parser'

db.on("error", console.log.bind(console, "erro de conexão"));
db.once("open", ()=> {
        console.log("conexao feita com sucesso"); 
}); 

const app = express();

app.options("*", cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
        preflightContinue: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"]
}))

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});


app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());    
app.use(express.json()); 

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, token"
  )
  res.header(
    "Access-Control-Allow-Methods",
    "POST, PUT, PATCH, GET, DELETE, OPTIONS"
  )
  next();
});

routes(app);

export default app;
