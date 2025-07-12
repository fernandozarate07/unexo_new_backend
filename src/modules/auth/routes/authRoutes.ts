import { Router } from "express";

// Creamos una instancia del enrutador de Express
const router = Router();

// Importamos los controladores de usuario
import { registerUserController } from "../controllers/registerUserController";
import { verifyUserController } from "../controllers/verifyUserController";
import loginUserController from "../controllers/loginUserController";

//Importammos validaciones
import registerValidator from "../validators/registerValidator";
import validateRequest from "../../../middlewares/validateRequest";
import verifyValidator from "../validators/verifyValidator";
import loginValidator from "../validators/loginValidator";
// Rutas
router.post("/register", registerValidator, validateRequest, registerUserController);
router.post("/register/verify", verifyValidator, validateRequest, verifyUserController);
router.post("/login", loginValidator, validateRequest, loginUserController);

export default router;
