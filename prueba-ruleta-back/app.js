
import express from "express";
import dotenv from "dotenv";
import { connectionMongo } from "./src/config/dataBase.js";
import { ruletaRouter } from "./src/routes/ruleta.route.js";
import { apuestaRouter } from "./src/routes/apuesta.route.js";
import cors from "cors";

const app = express(); 
dotenv.config(); 
connectionMongo();
app.use(cors()); 

app.use(express.json());

app.use("/ruleta", ruletaRouter);
app.use("/apuesta", apuestaRouter);

export default app;