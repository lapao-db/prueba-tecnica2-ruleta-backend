import { apuestaModel } from "../models/apuesta.model.js";
import { ruletaModel } from "../models/ruleta.model.js";

// Crear Apuesta - POST
export const postApuesta = async (request, response) => {
    try {
        // Traer id de ruleta para agregar apuesta
        const { idRuleta } = request.params;
        const { tipoApuesta, numero, color, dineroApuesta, usuarioId } = request.body;
        
        if (!tipoApuesta || !dineroApuesta || !usuarioId){
            return response.status(400).json({
                error : "Faltan campos requeridos"
            })
        }

        const ruleta = await ruletaModel.findById(idRuleta);
        if (!ruleta) {
            return response.status(404).json({ 
                error: 'Ruleta no encontrada' 
            });
        }

        if (ruleta.estado !== 'abierta') {
            return response.status(400).json({ 
                error: 'Esta ruleta se encuentra cerrada' 
            });
        }

        if ( dineroApuesta < 1 || dineroApuesta > 10000 ) {
            return response.status(400).json({ 
                error: 'El valor mínimo permitido es $1 dolar y el máximo son $10.000 dolares. ' 
            });
        }

        if (tipoApuesta === 'numero') {
            if (numero === undefined || numero < 0 || numero > 36) {
                return response.status(400).json({ 
                    error: 'Número inválido debe estar dentro de 0-36' 
                });
            }
        } else if (tipoApuesta === 'color') {
            if (!['rojo', 'negro'].includes(color)) {
                return response.status(400).json({ 
                    error: 'Color inválido' 
                });
            }
        } else {
            return response.status(400).json({ 
                error: 'Tipo de apuesta inválido, ingrese número o color' });
        }
        // crear apuesta
        const apuesta = await apuestaModel.create({
            
            tipoApuesta,
            numero: tipoApuesta === 'numero' ? numero : undefined,
            color: tipoApuesta === 'color' ? color : undefined,
            dineroApuesta,
            ruletaId: idRuleta,
            usuarioId
        });
       
        return response.status(201).json({
            mensaje: 'Apuesta creada exitosamente',
            apuesta: {
                id: apuesta._id,
                usuarioId: apuesta.usuarioId,
                tipoApuesta: apuesta.tipoApuesta,
                valor: tipoApuesta === 'numero' ? apuesta.numero : apuesta.color,
                monto: apuesta.dineroApuesta,
                fechaApuesta: apuesta.fechaApuesta
            }
        });

    } catch (error) {
         return response.status(500).json({
            mensaje: "Ocurrio un error al crear Apuesta",
            error: error.message || error
        });
    }
}
