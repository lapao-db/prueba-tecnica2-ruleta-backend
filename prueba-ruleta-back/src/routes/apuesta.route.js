import express from "express";
import { postApuesta } from "../controllers/apuesta.controller.js";

export const apuestaRouter = express.Router();

apuestaRouter.post("/:id/apuestas", postApuesta);