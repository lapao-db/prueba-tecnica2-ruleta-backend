import express from "express";
import { postRuleta, abrirRuleta, cerrarRuleta, getListaRuletas } from "../controllers/ruleta.controller.js";

export const ruletaRouter = express.Router();

ruletaRouter.post("/", postRuleta);
ruletaRouter.get("/",getListaRuletas);
ruletaRouter.put("/:idRuleta/abrir", abrirRuleta);
ruletaRouter.put("/:idRuleta/cerrar", cerrarRuleta);