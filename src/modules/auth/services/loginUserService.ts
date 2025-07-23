// src/modules/auth/services/loginUserService.ts

import { Request } from "express";
import passport from "@/config/passport";
import { User } from "@/types/User";

export default async function loginUserService(req: Request): Promise<User> {
  return new Promise((resolve, reject) => {
    passport.authenticate("local", (error: Error | null, user: User | false, _info: any) => {
      if (error) return reject({ code: "INTERNAL_SERVER_ERROR" });
      if (!user) return reject({ code: "INVALID_CREDENTIALS" });

      req.login(user, (err: Error | null) => {
        if (err) return reject({ code: "INTERNAL_SERVER_ERROR" });
        return resolve(user);
      });
    })(req);
  });
}
