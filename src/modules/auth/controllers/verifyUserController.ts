import { Request, Response } from "express";
import { verifyUserService } from "../services/verifyUserService";

export async function verifyUserController(req: Request, res: Response) {
  const { id, token } = req.body;

  try {
    const user = await verifyUserService({ id, token });

    return res.status(200).json({
      success: true,
      message: "Usuario verificado con éxito",
      user: { id: user.id },
    });
  } catch (error: any) {
    if (error.code === "INVALID_TOKEN") {
      return res.status(400).json({
        success: false,
        message: "Token inválido",
      });
    }

    if (error.code === "USER_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    console.error("Error al verificar usuario:", error);
    return res.status(500).json({
      success: false,
      message: "No se ha podido verificar el usuario",
    });
  }
}
