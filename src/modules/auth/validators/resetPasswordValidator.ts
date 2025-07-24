//src/modules/auth/validators/resetPasswordValidator.ts

import { body, ValidationChain } from "express-validator";

const updatePasswordValidator: ValidationChain[] = [
  body("token")
    .notEmpty()
    .withMessage("El token es obligatorio.")
    .isString()
    .withMessage("El token debe ser una cadena de texto."),

  body("newPassword")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("La nueva contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La nueva contraseña debe tener al menos 6 caracteres"),

  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Debe confirmar la nueva contraseña")
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage("Las contraseñas no coinciden"),
];

export default updatePasswordValidator;
