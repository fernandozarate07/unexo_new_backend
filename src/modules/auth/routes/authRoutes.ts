import { Router } from "express";

// Creamos una instancia del enrutador de Express
const router = Router();

// Importamos los controladores de usuario
import { registerUserController } from "../controllers/registerUserController";
import { verifyUserController } from "../controllers/verifyUserController";

//Importammos validaciones
import registerValidator from "../validators/registerValidator";
import validateRequest from "../../../middlewares/validateRequest";
import verifyValidator from "../validators/verifyValidator";
// Rutas
router.post("/register", registerValidator, validateRequest, registerUserController);
router.post("/email/verify", verifyValidator, validateRequest, verifyUserController);
export default router;
