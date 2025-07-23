//src/middlewares/checkIsUser.ts
import { Request, Response, NextFunction } from "express";
import { getUserRoleById } from "../modules/auth/repositories/authRepository";
import { User } from "../types/User";

const allowedRoles = ["user", "admin", "founder"];

export default async function checkIsUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as User | undefined;
    const userId = user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const userInDb = await getUserRoleById(userId);

    if (!userInDb) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!allowedRoles.includes(userInDb.role)) {
      return res.status(403).json({ message: "Acceso denegado: Rol no permitido" });
    }

    next();
  } catch (error) {
    console.error("Error en verificación de rol:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
