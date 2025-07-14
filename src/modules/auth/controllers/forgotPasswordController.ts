import { Response, Request } from "express";
import forgotPasswordService from "../services/forgotPasswordService";

// DTO entrada
interface ForgotPasswordDTO {
  email: string;
}

//DTO salida

export async function forgotPasswordController(req: Request<{}, {}, ForgotPasswordDTO>, res: Response) {
  const data: ForgotPasswordDTO = req.body;
  const email = data.email;
  try {
    await forgotPasswordService(email);
    return res.status(200).json({
      success: true,
      message: "Email de restablecimiento de contraseña enviado correctamente.",
    });
  } catch (error: any) {
    console.error("Error al intentar restablecer la contraseña", error);

    if (error.code === "USER_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Error al procesar la solicitud.",
    });
  }
}
