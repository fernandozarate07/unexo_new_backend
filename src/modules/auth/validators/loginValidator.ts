// src/modules/auth/validators/loginValidator.ts
import { body, ValidationChain } from "express-validator";

// Validaciones para el inicio de sesión de usuario
const loginValidator: ValidationChain[] = [
  body("email").trim().isEmail().withMessage("El correo electrónico debe ser válido"),
  body("password").trim().isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export default loginValidator;
