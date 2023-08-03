import express from 'express';
import cartsController from '../controllers/cart.controller.js';


const cartsRouter = express.Router();

cartsRouter.post('/', cartsController.newCart);
cartsRouter.get('/:cid', cartsController.getCartProduct);
cartsRouter.post('/:cid/product/:pid', cartsController.addCartProduct);

export default cartsRouter;