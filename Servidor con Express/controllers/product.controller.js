// Importación del módulo 'express' y los objetos 'request' y 'response' de 'express'
import express, { response, request } from "express";

// Importación de las funciones de servicio relacionadas con los productos desde el archivo '../services/product.service.js'
import { getProductByIdService, getProductsService } from "../services/product.service.js";

// Controlador para obtener todos los productos
export const getProductsController = async (req = request, res = response) => {
    try {
        // Obtiene el valor del parámetro 'limit' desde la consulta (query) de la solicitud
        const { limit } = req.query;

        // Llama a la función de servicio 'getProductsService' pasando el límite como argumento y espera su resultado
        const data = await getProductsService(Number(limit));

        // Responde con el resultado obtenido como una respuesta JSON con código de estado 200 (OK)
        return res.status(200).json(data);
    } catch (error) {
        // Si ocurre algún error, responde con el código de estado del error y el error como una respuesta JSON
        return res.status(error.httpcode).json({ error });
    }
};

// Controlador para obtener un producto por su ID
export const getProductByIdController = async (req = request, res = response) => {
    try {
        // Obtiene el valor de 'id' desde la ruta de la solicitud
        const { id } = req.params;

        // Llama a la función 'getProductByIdService' pasando el ID como argumento y espera su resultado
        const data = await getProductByIdService(Number(id));

        // Responde con el resultado obtenido como una respuesta JSON con código de estado 200 (OK)
        return res.status(200).json(data);
    } catch (error) {
        // Si ocurre algún error, responde con el código de estado del error y el error como una respuesta JSON
        return res.status(error.httpcode).json({ error });
    }
};
