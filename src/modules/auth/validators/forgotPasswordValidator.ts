//src/modules/auth/validators/forgotPasswordValidator.ts

import { body, ValidationChain } from "express-validator";

// Validaciones para el inicio de sesión de usuario
const forgotPasswordValidator: ValidationChain[] = [
  body("email").trim().isEmail().withMessage("El correo electrónico debe ser válido"),
];

export default forgotPasswordValidator;
