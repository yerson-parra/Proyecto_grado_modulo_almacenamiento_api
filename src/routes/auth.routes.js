import { Router } from "express";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { register, login, logout, verifyToken, profile,enviarCorreo, resetpassword} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
const router = Router();

router.post('/register',validateSchema(registerSchema),register);
router.post('/login',validateSchema(loginSchema),login);
router.post('/logout', logout);
router.get('/auth/verify', verifyToken);
router.get('/profile',authRequired,profile);
router.post('/sendemail',enviarCorreo);
router.post('/reset',resetpassword);
export default router;