import nodemailer from "nodemailer";

function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error("Las variables EMAIL_USER y EMAIL_PASS deben estar definidas en el entorno.");
  }

  return nodemailer.createTransport({
    service: "gmail", // o el proveedor que uses
    auth: {
      user,
      pass,
    },
  });
}

export async function sendMail(options: nodemailer.SendMailOptions) {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    ...options,
  });
}
