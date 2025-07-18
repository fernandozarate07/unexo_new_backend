import { Request, Response } from "express";
import resetPasswordService from "../services/resetPasswordService";

interface ResetPasswordDTO {
  token: string;
  newPassword: string;
}

export async function resetPasswordController(req: Request<{}, {}, ResetPasswordDTO>, res: Response) {
  const data: ResetPasswordDTO = req.body;
  const { token, newPassword } = data;
  try {
    await resetPasswordService(token, newPassword);
    return res.status(200).json({
      success: true,
      message: "Se restablecio la nueva contraseña correctamente",
    });
  } catch (error: any) {
    switch (error.code) {
      case "USER_NOT_FOUND":
        return res.status(404).json({ success: false, message: "Usuario no encontrado" });
      case "INVALID_NEW_PASSWORD":
        return res
          .status(400)
          .json({ success: false, message: "La nueva contraseña no puede ser igual a la anterior" });
      default:
        console.error("Error al actualizar contraseña:", error);
        return res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
  }
}
