import { Router } from "express";
import {
    getEstacion,
    createEstacion,
    updateEstacion,
    deleteEstacion,
    getEstaciones
} from "../controllers/estacion.controller.js"
import { validateSchema } from "../middlewares/validator.middlewares.js";
import {estacionSchema} from "../schemas/clima.schema.js";
import { authRequired, isAdmin } from "../middlewares/validateToken.js";

const router = Router();

router.get('/estaciones', getEstaciones);

router.get('/estaciones/:id', getEstacion);

router.post('/estaciones',validateSchema(estacionSchema),authRequired, isAdmin,createEstacion);

router.put('/estaciones/:id', authRequired,isAdmin,updateEstacion);

router.delete('/estaciones/:id', authRequired,isAdmin, deleteEstacion);

export default router;