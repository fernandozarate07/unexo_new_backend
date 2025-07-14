// src/modules/auth/controllers/registerController.ts
import { Request, Response } from "express";
import { registerUserService } from "../services/registerUserService";

// DTO de entrada
interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
}

// DTO de salida
interface UserResponseDTO {
  id: number;
}

export async function registerUserController(req: Request<{}, {}, RegisterUserDTO>, res: Response) {
  const data: RegisterUserDTO = req.body;

  try {
    const newUser = await registerUserService(data);

    const userResponse = {
      id: newUser.id,
    } satisfies UserResponseDTO;

    return res.status(200).json({
      success: true,
      message: "Usuario creado con éxito. Revisa tu correo para verificar la cuenta.",
      user: userResponse,
    });
  } catch (error: any) {
    console.error("Error al registrar usuario:", error);

    if (error.code === "EMAIL_ALREADY_USED") {
      return res.status(409).json({
        success: false,
        message: "Este email ya fue ocupado",
      });
    }
    return res.status(500).json({
      success: false,
      message: "No se ha podido crear el usuario",
    });
  }
}
