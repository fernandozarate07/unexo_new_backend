import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { authModule } from "./modules";

// Instancia de la aplicación Express
const app = express();

// Ruta principal
app.get("/", (_req, res) => {
  const environment: string | undefined = process.env.NODE_ENV;
  res.send(`API Unexo is running successfully! (${environment})`);
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Express Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // verdadero en producción, falso en desarrollo
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 12 * 60 * 60 * 1000, //tiempo de expiración de la sesión (12 horas)
    },
  })
);
// Passport
app.use(passport.initialize());
app.use(passport.session());

//rutas
app.use("/api/auth", authModule.routes);
export default app;
