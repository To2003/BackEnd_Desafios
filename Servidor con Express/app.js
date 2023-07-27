// Importación del módulo 'express'
import express from 'express';

// Importación del enrutador definido en './routes/product.routes.js'
import userRouter from './routes/product.routes.js';

// Creación de la instancia de la aplicación Express
const app = express();

// Definición del puerto en el que se ejecutará el servidor
const port = 8080;

// Configuración de middlewares para el manejo de solicitudes JSON y datos de formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uso del enrutador '/api/product' definido en 'userRouter' para todas las rutas que comiencen con '/api/product'
app.use('/api/product', userRouter);

// Ruta de inicio para la raíz del servidor, devuelve 'Hola Mundo!!' como respuesta
app.get('/', (req, res) => {
  res.send('Hola Mundo!!');
});

// Inicio del servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Ejemplo de app.js port> ${port}`);
});
