import dotenv from "dotenv";
import app from "./app";

// Determinar el archivo .env a cargar según el entorno
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : process.env.NODE_ENV === "staging"
    ? ".env.staging"
    : ".env.development";

dotenv.config({ path: envFile });

//define el puerto del servidor
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server Unexo is running on port ${PORT}`);
});
