const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const fileData = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(fileData);
    } catch (error) {
      // Si ocurre un error al leer el archivo o el archivo no existe,
      // se mantendrá el arreglo de productos vacío.
      this.products = [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, 'utf-8');
  }

  addProduct(product) {
    ProductManager.id++;
    const newProduct = {
      id: ProductManager.id,
      ...product
    };
    this.products.push(newProduct);
    this.saveProducts();
  }

  getProduct() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      return 'Error 404! Not Found';
    }
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedFields
      };
      this.saveProducts();
      return true;
    } else {
      return false;
    }
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      this.saveProducts();
      return true;
    } else {
      return false;
    }
  }
}

// Ejemplo de uso
const filePath = 'products.json';
const productos = new ProductManager(filePath);

console.log(productos.getProduct
