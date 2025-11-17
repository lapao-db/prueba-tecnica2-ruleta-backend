// Inicio del Servidor
import app from "./app.js";

const port = process.env.PORT;

// 3. ejecutar el servidor en nuestro computador
app.listen(port, ()=>{
    console.log(`El servidor está ejecutandose correctamente en http://localhost: ${port}`);
});