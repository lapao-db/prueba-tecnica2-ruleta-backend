import { ruletaModel } from "../models/ruleta.model.js";
import { apuestaModel } from "../models/apuesta.model.js";

// Crear ruleta - POST
export const postRuleta = async (request, response) =>{
    try {
        await ruletaModel.create(request.body);
        return response.status(201).json({
            "mensaje" : "Ruleta creada correctamente",
            "id": ruleta._id,
            "estado": ruleta.estado 
        });
    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ocurrio un error al crear Ruleta",
            "error": "error.message || error"
        });
    }
}

// Abrir ruleta - PUT 
export const abrirRuleta = async (request, response) =>{
    try {
        const {id} = request.params;
        const ruleta = await ruletaModel.findById(id);
        
        if (!ruleta) {
            return response.status(404).json({ 
                error: 'Ruleta no encontrada' 
            });
        }

        if (ruleta.estado === 'abierta') {
            return response.status(400).json({ 
                error: 'La ruleta ya está abierta' 
            });
        }
      
        ruleta.estado = 'abierta';
        ruleta.numeroGanador = null;
        ruleta.colorGanador = null;
        ruleta.fechaCierre = null;
        await ruleta.save();
                     
        response.status(200).json({
            mensaje: 'Ruleta abierta exitosamente disponible ',
            estado: ruleta.estado
        });
       

    } catch (error) {
       return response.status(400).json({
            "mensaje": "Ocurrio un error al abrir Ruleta",
            "error": "error.message || error"
        }); 
    }
}

// Cerrar la ruleta no permite ingreso de apuestas
export const cerrarRuleta = async (request, response) =>{
    try {
        const {idRuleta} = request.params;
        const ruleta = await ruletaModel.findById(idRuleta);
        
        if (!ruleta) {
            return response.status(404).json({ 
                error: 'Ruleta no encontrada' 
            });
        }

        if (ruleta.estado === 'cerrada' ){   
            return response.status(400).json({ 
            error: 'La ruleta ya está cerrada' 
            });
        }

        // Generar numero ganador y color
        const calcNumGanador = Math.floor(Math.random() * 37);
        const calcColorGanador = calcNumGanador % 2 === 0 ? 'rojo' : 'negro';
        

        // Actualiza valores ruleta
        ruleta.estado = 'cerrada';
        ruleta.numeroGanador = calcNumGanador;
        ruleta.colorGanador = calcColorGanador;
        await ruleta.save();

        // Calculo Apuestas por ronda de la ruleta
        const apuestas = await apuestaModel.find({
            ruletaId : idRuleta,
            gano : null
        })
        const resultadosApuestas = [];
        
        for (let apuesta of apuestas){
            let gano = false;
            let ganancia = 0;

            if (apuesta.tipoApuesta === 'numero' && apuesta.numero === calcNumGanador){
                gano = true;
                ganancia = apuesta.dineroApuesta * 5;
            }else if(apuesta.tipoApuesta === 'color' && apuesta.color === calcColorGanador){
                gano = true;
                ganancia = apuesta.dineroApuesta * 1.8;
            }
            
            apuesta.gano = gano;
            apuesta.ganancia = ganancia;
            await apuesta.save();

            resultadosApuestas.push({
                usuarioId : apuesta.usuarioId,
                gano,
                ganancia
            })
        }

        return response.status(200).json({
            calcNumGanador,
            calcColorGanador,
            resultadosApuestas
        })

        
    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ocurrio un error al cerrar la Ruleta",
            "error": "error.message || error"
        });    
    }
}

// Listar todas las ruletas creadas con Estados actuales
export const getListaRuletas = async (request, response) => {
    try {
        const todasRuletas = await ruletaModel.find();
        return response.status(200).json({
            "mensaje" : `Hemos encontrado ${todasRuletas.length} Ruletas creadas `,
            todasRuletas
        });


    } catch (error) {
       return response.status(400).json({
            "mensaje": "Ocurrio un error al mostrar todas las Ruletas",
            "error": "error.message || error"
        });  
    }
}

