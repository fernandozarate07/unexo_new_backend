import { Router } from "express";

// Creamos una instancia del enrutador de Express
const router = Router();

// Importamos los controladores de usuario

// Rutas
router.get("/register", async (req, res) => {
  res.status(200).json("Registro exitoso");
});

export default router;
