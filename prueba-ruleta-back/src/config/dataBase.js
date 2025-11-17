import mongoose from "mongoose";

export async function connectionMongo(){

    try{
        // conectar base de datos
        await mongoose.connect(process.env.DB_URL,{dbName: 'ruletaVirtual'});
        console.log('Conexión exitosa con la base de datos');
    }catch(error){
        console.error('Error de conexión: ' + error);
    }
} 