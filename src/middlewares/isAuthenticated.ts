//src/middlewares/isAuthenticated.ts
import { Request, Response, NextFunction } from "express";

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: "Cliente no autorizado" });
  }
}
export default isAuthenticated;
