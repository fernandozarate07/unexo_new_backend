import { Request } from "express";

export default async function logoutUserService(req: Request): Promise<void> {
  return new Promise((resolve, reject) => {
    req.logout((err) => {
      if (err) {
        return reject({ code: "INTERNAL_SERVER_ERROR" });
      }
      resolve();
    });
  });
}
