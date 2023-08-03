// Importación de modulos
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import exphbs from 'express-handlebars';

// Importación de los enrutadores definidos
import userRouter from './routes/product.routes.js';
import cartsRouter from './routes/cart.routes.js';
import { Socket } from 'dgram';

// Creación de la instancia de la aplicación Express
const app = express();

// **************
const server = http.createServer(app);
const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('Usuario conectado');
  
    // Envía la lista de productos al cliente cuando se conecta
    socket.emit('productos', productos);
  
    // Lógica para manejar la creación de un nuevo producto (simulación)
    socket.on('nuevoProducto', (nuevoProducto) => {
      // Lógica para guardar el nuevo producto en la base de datos o en la lista de productos
      productos.push(nuevoProducto);
  
      // Envía la lista actualizada de productos a todos los clientes conectados
      io.emit('productos', productos);
    });
  
    // Lógica para manejar la eliminación de un producto (simulación)
    socket.on('eliminarProducto', (productoId) => {

      // Lógica para eliminar el producto de la base de datos o de la lista de productos
      const index = productos.findIndex((producto) => producto.id === productoId);
      if (index !== -1) {
        productos.splice(index, 1);
  
        // Envía la lista actualizada de productos a todos los clientes conectados
        io.emit('productos', productos);
      }
    });
  
    socket.on('disconnect', () => {
      console.log('Usuario desconectado');
    });

  });

// Definición del puerto en el que se ejecutará el servidor
const port = 8080;

// Configuración de middlewares para el manejo de solicitudes JSON y datos de formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura el motor de plantillas Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Configura el servidor para servir archivos estáticos
app.use(express.static('public'));

// Uso del enrutador '/api/product' definido en 'userRouter' para todas las rutas que comiencen con '/api/product'
app.use('/api/product', userRouter);
app.use('/api/carts', cartsRouter);


// Ruta de inicio para la raíz del servidor, devuelve 'Hola Mundo!!' como respuesta
app.get('/', (req, res) => {
  res.send('Hola Mundo!!');
});

// Inicio del servidor en el puerto especificado
server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
