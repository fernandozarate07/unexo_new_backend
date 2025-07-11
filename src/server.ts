// server.ts

//Configuramos variables de entorno
import dotenv from "dotenv";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : process.env.NODE_ENV === "staging"
    ? ".env.staging"
    : ".env.development";

dotenv.config({ path: envFile });

// Importamos la aplicación Express
import app from "./app";

const PORT = process.env.PORT || 5001;

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
});
