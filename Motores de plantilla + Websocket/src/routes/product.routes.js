// Importación de módulos necesarios
import { Router } from "express";
import { getProductByIdController, getProductsController } from '../controllers/product.controller.js';

// Creación del enrutador
const productRouter = Router();

// Definición de las rutas y asignación de controladores
// Ruta para obtener todos los productos (método GET a la ruta '/')
productRouter.get('/', getProductsController);

// Ruta para obtener un producto específico por su ID (método GET a la ruta '/:id')
// ':id' es un parámetro de la ruta que se puede acceder en el controlador para obtener el ID específico solicitado.
productRouter.get('/:id', getProductByIdController);

// Exportación del enrutador para que pueda ser utilizado en otros archivos o módulos
export default productRouter;
