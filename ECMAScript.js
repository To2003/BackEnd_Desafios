const manager = new ProductManager();

const product1 = {
    title: "Producto 1",
    description: "Iphone Iphone Iphone Iphone Iphone",
    price: 10000,
    thumbnail: "https://www.apple.com/la/newsroom/2020/10/apple-introduces-iphone-12-pro-and-iphone-12-pro-max-with-5g/",
    code: "123ZZZ",
    stock: 25
}

const product2 = {
    title: "Producto 1",
    description: "Iphone Iphone Iphone Iphone Iphone",
    price: 10000,
    thumbnail: "https://www.apple.com/la/newsroom/2020/10/apple-introduces-iphone-12-pro-and-iphone-12-pro-max-with-5g/",
    code: "AAA123",
    stock: 25
}

class ProductManager {
    constructor() {
        this.products = [];
        this.id= 0;
    }

    checkProducto(product){
        return (
            product.title && 
            product.description && 
            product.price && 
            product.thumbnail && 
            product.code && 
            product.stock
            );
    }

    isCodeDuplicated(code) {
        return this.products.some(product => product.code === code);
    }
    
    addProduct(product) {
        if(!this.checkProducto(product)) {
            console.log("Error: Completar todos los datos.");
            return;
        }
        if(this.isCodeDuplicated(product.code)) {
            console.log("Error: Este codigo de producto ya existe.");
            return;
        }
        const newProduct = {
            ...product,
            id: ++this.id
        }
        this.products.push(newProduct);
    }

    getProducts() {
        console.log(this.products);
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if(!product) {
            console.log("Error 404! Not Found");
            return; 
        }
        else{
            console.log(product);
        }
    }
}

manager.getProducts();
manager.addProduct(product1);
manager.getProducts();
manager.addProduct(product2);
manager.getProducts();
manager.getProductById(1);