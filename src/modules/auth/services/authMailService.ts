// src/modules/auth/services/authMailService.ts

import { sendMail } from "@/services/mailService";

export async function sendResetPasswordEmail(email: string, resetLink: string) {
  await sendMail({
    type: "reset-password",
    email,
    data: { resetLink },
  });
}

export async function sendWelcomeEmail(email: string, verifyLink: string) {
  await sendMail({
    type: "verify",
    email,
    data: { verifyLink },
  });
}
