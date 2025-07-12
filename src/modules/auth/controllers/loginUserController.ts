import loginUserService from "../services/loginUserService";
import { Request, Response } from "express";

export default async function loginUserController(req: Request, res: Response) {
  try {
    const user = await loginUserService(req);

    return res.status(200).json({
      success: true,
      message: "Se inició sesión correctamente",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
        role: user.role,
        points: user.points,
      },
    });
  } catch (error: any) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        success: false,
        message: "Email o contraseña incorrectos",
      });
    }

    console.error("Error en login:", error);

    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
}
