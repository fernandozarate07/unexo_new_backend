import { sendMail as sendMailBase } from "@/config/mailer";

interface MailPayload {
  type?: "custom" | "reset-password" | "verify";
  email: string;
  subject?: string;
  html?: string;
  data?: Record<string, any>;
}

/**
 * Servicio base reutilizable para enviar emails.
 */
export async function sendMail({ type = "custom", email, subject, html, data = {} }: MailPayload): Promise<void> {
  if (type !== "custom") {
    const { predefinedSubject, predefinedHtml } = getPredefinedTemplate(type, data);
    subject = subject || predefinedSubject;
    html = html || predefinedHtml;
  }

  if (!subject || !html) {
    throw new Error("Faltan subject o html en el email.");
  }

  await sendMailBase({
    to: email,
    subject,
    html,
  });
}

/**
 * Plantillas predefinidas de mails según tipo
 */
function getPredefinedTemplate(type: Exclude<MailPayload["type"], "custom">, data: Record<string, any>) {
  switch (type) {
    case "reset-password":
      if (!data.resetLink) throw new Error("Falta resetLink para el email de restablecimiento");
      return {
        predefinedSubject: "Restablecé tu contraseña - Unexo",
        predefinedHtml: `
  <div style="font-family: Arial, sans-serif; background-color: #e4e4e7; padding: 20px;">
    <table width="100%">
      <tr>
        <td align="center">
          <table width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <tr>
              <td style="padding: 10px; text-align: center; border-bottom: 1px solid #000000;">
                <img src="https://res.cloudinary.com/doujehj3u/image/upload/v1750617930/UNEXO_n5negg.png" alt="Unexo Logo" width="100" />
              </td>
            </tr>
            <tr>
              <td style="padding: 30px;">
                <p style="font-size: 16px;">Hola,</p>
                <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en <strong>Unexo</strong>.</p>
                <p>Para continuar, hacé clic en el siguiente botón:</p>
                <p style="text-align: center;">
                  <a href="${data.resetLink}" style="display: inline-block; padding: 12px 24px; margin-top: 12px; margin-bottom: 12px; background-color: #000000; color: #ffffff; text-decoration: none; border-radius: 5px;">
                    Restablecer contraseña
                  </a>
                </p>
                <p>Este enlace estará disponible por <strong>1 hora</strong>. Si no realizaste esta solicitud, podés ignorar este mensaje.</p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #000; text-align: center; padding: 10px;">
                <img src="https://res.cloudinary.com/doujehj3u/image/upload/v1750617851/4_n9elsv.png" width="40" />
                <p style="font-size: 12px; color: #999;">© 2025 Unexo. Todos los derechos reservados.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
`,
      };

    case "verify":
      if (!data.verifyLink) throw new Error("Falta verifyLink para el email de verificación");
      return {
        predefinedSubject: "Confirmá tu correo electrónico - Unexo",
        predefinedHtml: `
  <div style="font-family: Arial, sans-serif; background-color: #e4e4e7; padding: 20px;">
    <table width="100%">
      <tr>
        <td align="center">
          <table width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <tr>
              <td style="padding: 10px; text-align: center; border-bottom: 1px solid #000000;">
                <img src="https://res.cloudinary.com/doujehj3u/image/upload/v1750617930/UNEXO_n5negg.png" alt="Unexo Logo" width="100" />
              </td>
            </tr>
            <tr>
              <td style="padding: 30px;">
                <p style="font-size: 16px;">¡Bienvenido/a a <strong>Unexo</strong>!</p>
                <p>Estamos felices de tenerte. Para comenzar, necesitás confirmar tu dirección de correo electrónico.</p>
                <p style="text-align: center;">
                  <a href="${data.verifyLink}" style="display: inline-block; padding: 12px 24px; margin-top: 12px; margin-bottom: 12px; background-color: #000000; color: #ffffff; text-decoration: none; border-radius: 5px;">
                    Verificar correo
                  </a>
                </p>
                <p>Si vos no creaste esta cuenta, podés ignorar este mensaje.</p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #000; text-align: center; padding: 10px;">
                <img src="https://res.cloudinary.com/doujehj3u/image/upload/v1750617851/4_n9elsv.png" width="40" />
                <p style="font-size: 12px; color: #999;">© 2025 Unexo. Todos los derechos reservados.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
`,
      };

    default:
      throw new Error(`Tipo de email no soportado: ${type}`);
  }
}
