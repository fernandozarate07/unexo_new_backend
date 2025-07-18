// src/modules/auth/routes/authRoutes.ts

import { Router } from "express";

// Creamos una instancia del enrutador de Express
const router = Router();

//Importamos validaciones
import registerValidator from "../validators/registerValidator";
import verifyValidator from "../validators/verifyValidator";
import loginValidator from "../validators/loginValidator";
import updatePasswordValidator from "../validators/updatePasswordValidator";
import forgotPasswordValidator from "../validators/forgotPasswordValidator";
import resetPasswordValidator from "../validators/resetPasswordValidator";

// Importamos el middlewares
import validateRequest from "@/middlewares/validateRequest";
import isAuthenticated from "@/middlewares/isAuthenticated";
import checkIsUser from "@/middlewares/checkIsUser";

// Importamos controladores
import { registerUserController } from "../controllers/registerUserController";
import { verifyUserController } from "../controllers/verifyUserController";
import loginUserController from "../controllers/loginUserController";
import logoutUserController from "../controllers/logoutUserController";
import updatePasswordController from "../controllers/updatePasswordController";
import { forgotPasswordController } from "../controllers/forgotPasswordController";
import { resetPasswordController } from "../controllers/resetPasswordController";

// Rutas
router.post("/register", registerValidator, validateRequest, registerUserController);
router.post("/register/verify", verifyValidator, validateRequest, verifyUserController);
router.post("/login", loginValidator, validateRequest, loginUserController);
router.get("/logout", isAuthenticated, logoutUserController);
router.put(
  "password",
  isAuthenticated,
  checkIsUser,
  updatePasswordValidator,
  validateRequest,
  updatePasswordController
);
router.post("/passwpord/forgot", forgotPasswordValidator, validateRequest, forgotPasswordController);
router.post("/password/reset", resetPasswordValidator, validateRequest, resetPasswordController);

export default router;
