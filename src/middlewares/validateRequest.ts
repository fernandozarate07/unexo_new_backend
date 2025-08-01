// src/middlewares/validateRequest.ts

import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export default function validateRequest(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
}
