import { Router } from "express";
const router= Router()
import * as climaCtrl from '../controllers/Clima.controller'
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { climaSchema } from "../schemas/clima.schema";
import { authRequired, isAdmin } from "../middlewares/validateToken.js";
/**
 * @swagger
 * components:
 *  schemas:
 *      Clima:
 *          type: object
 *          properties:
 *              temperatura:
 *                  type: number
 *                  description: temperatura  del ambiente
 *              humedad:
 *                  type: number
 *                  description: humedad del ambiente
 *          required:
 *              - temperatura
 *              - humedad
 *          example:
 *              temperatura: 21
 *              humedad: 55
 */
// crear estados del clima
/**
 * @swagger
 * /api/clima:
 *  post:
 *      summary: crea un nuevo estado del clima
 *      tags: [Clima]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Clima'
 *      responses:
 *          200:
 *              description: estado del clima guardado
 */
router.post('/clima',validateSchema(climaSchema),authRequired,isAdmin,climaCtrl.setClima)

// Obetener estados del clima
/**
 * @swagger
 * /api/clima:
 *  get:
 *      summary: retorna todos los estados del clima
 *      tags: [Clima]
 *      responses:
 *          200:
 *              description: todos los estados del clima
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Clima'
 */
router.get('/clima', climaCtrl.getClima)

// Obtener un  estado del clima por id
/**
 * @swagger
 * /api/clima/{climaId}:
 *  get:
 *      summary: retorna un estado del clima
 *      tags: [Clima]
 *      parameters:
 *          - in: path
 *            name: climaId
 *            schema:
 *              type: string
 *            required: true
 *            description : id del estado del clima
 *      responses:
 *          200:
 *              description: un  estado del clima
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Clima'
 *          404:
 *              description: no existe el estado del clima
 */
router.get('/clima/:climaId', climaCtrl.getClimaById)

// Actualizar un  estado del clima por id
/**
 * @swagger
 * /api/clima/{climaId}:
 *  put:
 *      summary: actualiza un estado del clima
 *      tags: [Clima]
 *      parameters:
 *          - in: path
 *            name: climaId
 *            schema:
 *              type: string
 *            required: true
 *            description : id del estado del clima
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Clima'
 *      responses:
 *          200:
 *              description: estado del clima actualizado
 *          404:
 *              description: no existe el estado del clima
 */
router.put('/clima/:climaId',authRequired,isAdmin,climaCtrl.updateClimaById)

// Eliminar un estado del clima por id
/**
 * @swagger
 * /api/clima/{climaId}:
 *  delete:
 *      summary: borra un estado del clima
 *      tags: [Clima]
 *      parameters:
 *          - in: path
 *            name: climaId
 *            schema:
 *              type: string
 *            required: true
 *            description : id del estado del clima
 *      responses:
 *          200:
 *              description: estado del clima borrado
 *          404:
 *              description: no existe el estado del clima
 */
router.delete('/clima/:climaId',authRequired,isAdmin,climaCtrl.deleteClimaById)

export default router;