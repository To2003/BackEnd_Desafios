import express from 'express';
import ProductManager from '../managers/ProductManager';
import { __dirname } from '../utils/dirname';
import { Router } from "express";

const viewRouter = express.Router();



const pManager = new ProductManager(__dirname+'/data/Products.json')

// Ruta para la vista home.handlebars (sin WebSockets)
viewRouter.get('/', async(req, res) => {
    const listProducts= pManager.getProduct({}) 
    res.render('home', { listProducts });
  });
  
  // Ruta para la vista realtimeproducts.handlebars (con WebSockets)
  viewRouter.get('/realtimeproducts', async(req, res) => {
    res.render('realTimeProducts', { listProducts });
  });
  
  export default viewRouter;