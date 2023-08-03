const fs = import ('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath; // Ruta del archivo donde se guardarán los productos
    this.products = []; // Arreglo donde se almacenarán los productos en memoria
    this.loadProducts(); // Cargamos los productos desde el archivo
  }

  loadProducts() {
  try {
    const fileData = fs.readFileSync(this.path, 'utf-8'); // Leemos el archivo de forma síncrona
    this.products = JSON.parse(fileData); // Convertimos el contenido del archivo a un objeto JavaScript
    } 
  catch (error) {
    // Si ocurre un error al leer el archivo o el archivo no existe,
    // se mantendrá el arreglo de productos vacío.
    this.products = [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2); // Convertimos el arreglo de productos a formato JSON
    fs.writeFileSync(this.path, data, 'utf-8'); // Escribimos el contenido en el archivo de forma síncrona
  }

  addProduct(product) {
    ProductManager.id++; // Incrementamos el ID estático de la clase (con cada nuevo producto agregado)
    const newProduct = {
      id: ProductManager.id, // Asignamos el ID al nuevo producto
      ...product // Agregamos las demás propiedades del producto
    };
    this.products.push(newProduct); // Agregamos el nuevo producto al arreglo de productos
    this.saveProducts(); // Guardamos los productos en el archivo
}

 getProduct() {
  return this.products; // Devolvemos el arreglo de productos
}

getProductById(id) {
  const product = this.products.find((product) => product.id === id); // Buscamos el producto por su ID
  if (product) {
    return product; // Si se encuentra el producto, lo devolvemos
  } else {
    return 'Error 404! Not Found'; // Si no se encuentra, devolvemos un mensaje de error
  }
  }

 updateProduct(id, updatedFields) {
  const productIndex = this.products.findIndex((product) => product.id === id); // Buscamos el índice del producto a actualizar
  if (productIndex !== -1) {
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updatedFields
    }; // Actualizamos los campos del producto con los valores proporcionados en `updatedFields`
    this.saveProducts(); // Guardamos los productos actualizados en el archivo
    return true; // Indicamos que la actualización se realizó con éxito
    } else {
      return false; // Indicamos que no se encontró el producto para actualizar
    }
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((product) => product.id === id); // Buscamos el índice del producto a eliminar en el arreglo de productos
    if (productIndex !== -1) { // Si encontramos el producto en el arreglo
      this.products.splice(productIndex, 1); // Eliminamos el producto del arreglo
      this.saveProducts(); // Guardamos los productos actualizados en el archivo
      return true; // Indicamos que la eliminación se realizó con éxito
    } else {
      return false; // Indicamos que no se encontró el producto para eliminar
    }
  }
}

// Ejemplo de uso
const filePath = 'products.json';
const productos = new ProductManager(filePath);

console.log(productos.getProduct());

export default ProductManager;