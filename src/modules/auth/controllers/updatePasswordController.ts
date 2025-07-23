// src/modules/auth/controllers/updatePasswordController.ts
import { Request, Response } from "express";
import updatePasswordService from "../services/updatePasswordService";
import { User } from "@/types/User";
//DTO entrada
interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export default async function updatePasswordController(req: Request<{}, {}, UpdatePasswordRequest>, res: Response) {
  const data = req.body;
  const { currentPassword, newPassword } = data;
  const user = req.user as User | undefined;

  if (!user?.id) {
    return res.status(401).json({ success: false, message: "Usuario no autenticado" });
  }

  try {
    const userId: number = user.id;
    await updatePasswordService({ currentPassword, newPassword, userId });

    return res.status(200).json({
      success: true,
      message: "Contraseña cambiada con éxito",
    });
  } catch (error: any) {
    switch (error.code) {
      case "USER_NOT_FOUND":
        return res.status(404).json({ success: false, message: "Usuario no encontrado" });
      case "INVALID_CURRENT_PASSWORD":
        return res.status(400).json({ success: false, message: "La contraseña actual es incorrecta" });
      default:
        console.error("Error al actualizar contraseña:", error);
        return res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
  }
}
