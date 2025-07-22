import { Request, Response } from "express";
import { verifyUserService } from "../services/verifyUserService";

// DTO de entrada
interface VerifyUserDTO {
  id: number;
  token: string;
}
// DTO de salida
interface UserResponseDTO {
  id: number;
}
export async function verifyUserController(req: Request<{}, {}, VerifyUserDTO>, res: Response) {
  const data: VerifyUserDTO = req.body;
  const { id, token } = data;
  try {
    const user = await verifyUserService({ id, token });

    const userResponse = {
      id: user.id,
    } satisfies UserResponseDTO;

    return res.status(200).json({
      success: true,
      message: "Usuario verificado con éxito",
      user: userResponse,
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
