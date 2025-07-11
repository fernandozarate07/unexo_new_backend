import { body, ValidationChain } from "express-validator";

const verifyValidator: ValidationChain[] = [
  body("id")
    .notEmpty()
    .withMessage("El ID del usuario es obligatorio.")
    .isInt()
    .withMessage("El ID debe ser un número entero."),

  body("token")
    .notEmpty()
    .withMessage("El token es obligatorio.")
    .isString()
    .withMessage("El token debe ser una cadena de texto."),
];

export default verifyValidator;
