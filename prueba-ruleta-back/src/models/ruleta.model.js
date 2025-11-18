import mongoose from "mongoose";

const ruletaSchema = new mongoose.Schema({
    estado : {
        type: String,
        enum : ['abierta', 'cerrada'],
        default : 'abierta'
    },
    numeroGanador: {
    type: Number,
    min: 0,
    max: 36,
    default: null
    },
    colorGanador: {
        type: String,
        enum: ['rojo', 'negro', null],
        default: null
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaCierre: {
        type: Date,
        default: null
    }

});

export const ruletaModel = mongoose.model("ruleta", ruletaSchema);