import { body, ValidationChain } from "express-validator";

const updatePasswordValidator: ValidationChain[] = [
  body("currentPassword")
    .trim()
    .notEmpty()
    .withMessage("La contraseña actual es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña actual debe tener al menos 6 caracteres"),

  body("newPassword")
    .trim()
    .notEmpty()
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
