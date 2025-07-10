import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { User } from "../types/User";
import prisma from "./prisma";

// Estrategia local
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          return done(null, false, { message: "ERROR: Usuario no encontrado" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "ERROR: Contraseña incorrecta" });
        }
        return done(null, user);
      } catch (error) {
        console.error("ERROR en la autenticación:", error);
        return done(error);
      }
    }
  )
);

// Serialización del usuario
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialización del usuario
passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    console.error("ERROR al deserializar el usuario:", error);
    done(error, null);
  }
});

export default passport;
