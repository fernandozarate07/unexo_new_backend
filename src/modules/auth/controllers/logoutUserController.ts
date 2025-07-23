//src/modules/auth/controllers/logoutUserController.ts
import logoutUserService from "../services/logoutUserService";
import { Request, Response } from "express";

export default async function logoutUserController(req: Request, res: Response) {
  try {
    await logoutUserService(req);

    return res.status(200).json({
      success: true,
      message: "Se cerró sesión correctamente",
    });
  } catch (error: any) {
    console.error("Error en logout:", error);

    const message =
      error.code === "INTERNAL_SERVER_ERROR" ? "Error interno del servidor" : "Ocurrió un error inesperado";

    return res.status(500).json({
      success: false,
      message,
    });
  }
}
