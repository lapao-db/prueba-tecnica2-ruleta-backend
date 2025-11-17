
import express from "express";
import dotenv from "dotenv";
import { connectionMongo } from "./src/config/dataBase.js";
import cors from "cors";

const app = express(); 
dotenv.config(); 
connectionMongo();
app.use(cors()); 

app.use(express.json());


export default app;