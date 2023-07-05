class ProductManager{
    constructor(){
        this.products=[]
    
    }
    static id=0
    addProduct(title, description, price, thumbmail, code, stock){
        ProductManager.id++
        this.products.push({title, description, price, thumbmail, code, stock, id:ProductManager.id});
    }

    getProduct(){
        return this.products
    }

    getProductById(id){
        if(!this.products.find((product)=> product.id === id)){
            return 'Error 404! Not Found'
        }else{
            return this.products.find((product)=> product.id === id)
        }
    }
}
 const productos = new ProductManager();

 console.log(productos.getProduct());

 productos.addProduct('Iphone 12','12 Pro Max', 10000,'https://www.apple.com/la/newsroom/2020/10/apple-introduces-iphone-12-pro-and-iphone-12-pro-max-with-5g/','123ABC', 5)
 productos.addProduct('Iphone 13','13 Pro Max', 15000,'https://www.apple.com/la/newsroom/2020/10/apple-introduces-iphone-12-pro-and-iphone-12-pro-max-with-5g/','987CBA', 12)

 console.log(productos.getProduct());

 console.log(productos.getProductById(2));

 console.log(productos.getProductById(3));
