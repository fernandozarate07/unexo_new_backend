// src/modules/auth/controllers/registerController.ts
import { Request, Response } from "express";
import { registerUserService } from "../services/registerService";

export async function registerUserController(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const newUser = await registerUserService({ name, email, password });
    return res.status(200).json({
      success: true,
      message: "Usuario creado con éxito. Revisa tu correo para verificar la cuenta.",
      user: { id: newUser.id },
    });
  } catch (error: any) {
    if (error.message === "EMAIL_ALREADY_USED") {
      return res.status(409).json({
        success: false,
        message: "Este email ya fue ocupado",
      });
    }

    console.error("Error al registrar usuario:", error);
    return res.status(500).json({
      success: false,
      message: "No se ha podido crear el usuario",
    });
  }
}
