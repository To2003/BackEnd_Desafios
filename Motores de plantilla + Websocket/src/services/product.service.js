// Importación del módulo ProductManager desde el archivo "../managers/ProductManager.js"
import ProductManager from "../managers/ProductManager.js";



// Creación de una instancia de ProductManager con los archivos de datos 'products.json' y 'count.txt'
const productManager = new ProductManager('./desafio03/data/products.json', './desafio03/data/count.txt');

// Función de servicio para obtener productos
export const getProductsService = async (limit) => {
    try {
        // Llamada al método "getProducts" de la instancia "productManager"
        const products = await productManager.getProducts();

        // Si no se encontraron productos en la base de datos, se lanza un error con código 500 y descripción adecuada
        if (products.length <= 0) throw { name: 'db error', httpcode: 500, description: 'No se encontraron productos' };

        // Si se especifica un límite, se devuelve un número limitado de productos, sino se devuelven todos los productos
        if (limit) {
            const limited = products.slice(0, limit);
            return limited;
        }

        return products;
    } catch (error) {
        // Si ocurre algún error, se relanza para que sea manejado en el controlador
        throw error;
    }
};

// Función de servicio para obtener un producto por su ID
export const getProductByIdService = async (id) => {
    try {
        // Llamada al método "getProductsById" de la instancia "productManager" con el ID proporcionado
        const product = await productManager.getProductsById(id);
        
        // Si el producto no se encuentra en la base de datos, se lanza un error con código 404 y descripción adecuada
        if (!product) throw { name: 'client error', httpcode: 404, description: 'Producto no encontrado' };
        return product;

    } catch (error) {
        // Si ocurre algún error, se relanza para que sea manejado en el controlador
        throw error;
    }
};
