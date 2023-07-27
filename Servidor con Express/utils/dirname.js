// Importación de los módulos 'node:path' y 'node:url'
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Obtiene el nombre del archivo actual (__filename) y lo convierte a una ruta de sistema de archivos (path)
const __filename = fileURLToPath(import.meta.url);

// A partir del nombre del archivo, obtiene el nombre del directorio (__dirname)
export const __dirname = path.dirname(__filename);
