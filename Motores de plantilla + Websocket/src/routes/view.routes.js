import express from 'express';
import ProductManager from '../managers/ProductManager';
import { __dirname } from '../utils/dirname';

const router = express.Router();

const pManager = new ProductManager(__dirname+'/data/Products.json')

// Ruta para la vista home.handlebars (sin WebSockets)
router.get('/', async(req, res) => {
    const listProducts=await pManager.getProduct({}) 
    res.render('home', { listProducts });
  });
  
  // Ruta para la vista realtimeproducts.handlebars (con WebSockets)
  router.get('/realtimeproducts', async(req, res) => {
    res.render('realTimeProducts', { listProducts });
  });
  
  export default router;