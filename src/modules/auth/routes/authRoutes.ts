import { Router } from "express";

// Creamos una instancia del enrutador de Express
const router = Router();

// Importamos los controladores de usuario
import { registerUserController } from "../controllers/registerUserController";
import { verifyUserController } from "../controllers/verifyUserController";
import loginUserController from "../controllers/loginUserController";
import logoutUserController from "../controllers/logoutUserController";

//Importammos validaciones
import registerValidator from "../validators/registerValidator";
import verifyValidator from "../validators/verifyValidator";
import loginValidator from "../validators/loginValidator";

// Importamos el middlewares
import validateRequest from "@/middlewares/validateRequest";
import isAuthenticated from "@/middlewares/isAuthenticated";

// Rutas
router.post("/register", registerValidator, validateRequest, registerUserController);
router.post("/register/verify", verifyValidator, validateRequest, verifyUserController);
router.post("/login", loginValidator, validateRequest, loginUserController);
router.get("logout", isAuthenticated, logoutUserController);

export default router;
