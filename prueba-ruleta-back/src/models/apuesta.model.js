import mongoose from "mongoose";

const apuestaSchema = new mongoose.Schema({
    tipoApuesta: {
        type: String,
        enum: ['numero', 'color'],
        required: true
    },
    numero : {
        type: Number,
        min : 0,
        max : 36
    },
    color : {
        type : String,
        enum : ['rojo','negro', null]
    },
    dineroApuesta: {
        type: Number,
        required : true,
        min : [0.01,'Monto minimo es de $1 dolar'],
        max : [10000,'Apuesta monto máximo de $10000 dolares'],
        
    },
    gano : {
        type: Boolean,
        default: null
    }
    ,
    ganancia: {
        type: Number,
        default: 0,
        min: 0
    },
    ruletaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ruleta',
        required: true
    },
    usuarioId:{
        type: String,
        required: true
    },
    fechaApuesta: {
        type: Date,
        default: Date.now
    }
    
});

export const apuestaModel = mongoose.model('apuesta', apuestaSchema);