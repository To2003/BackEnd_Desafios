import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const cartsFilePath = './src/data/Carts.json';

const findDataFile = async () => {
  try {
    const data = await fs.promises.readFile(cartsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeDataFile = async (data) => {
  try {
    await fs.promises.writeFile(cartsFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error('Error al escribir en el archivo');
  }
};

const cartsController = {
  newCart: async (req, res) => {
    const nuevoCarrito = {
      id: uuidv4(),
      products: [],
    };
    const carts = await findDataFile();
    carts.push(nuevoCarrito);
    await writeDataFile(carts);
    res.status(201).json(nuevoCarrito);
  },

  getCartProduct: async (req, res) => {
    const carts = await findDataFile();
    const carrito = carts.find((item) => item.id === req.params.cid);
    if (carrito) {
      res.json(carrito.products);
    } else {
      res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }
  },

  addCartProduct: async (req, res) => {
    const cant = req.body.quantity || 1;
    const carts = await findDataFile();
    const cartIndex = carts.findIndex((item) => item.id === req.params.cid);
    if (cartIndex !== -1) {
      const carrito = carts[cartIndex];
      const productoAAgregar = { id: req.params.pid, cant };
      const productsIndex = carrito.products.findIndex((item) => item.id === req.params.pid);

      if (productsIndex !== -1) {
        carrito.products[productsIndex].cant += cant;
      } else {
        carrito.products.push(productoAAgregar);
      }

      await writeDataFile(carts);
      res.json(carrito.products);
    } else {
      res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }
  },
};

export default cartsController;