console.log("DEBUG: Cargando mailer.js");

import nodemailer from "nodemailer";

const MAIL_USER = process.env.MAIL_USER || "francorepuestoselcholo@gmail.com";
const MAIL_PASS = process.env.MAIL_PASS || process.env.mail_pass || null;

if (!MAIL_PASS) {
  console.warn("[MAILER] ADVERTENCIA: MAIL_PASS no está definido. NO se podrán enviar correos.");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

/**
 * Enviar correo al proveedor con adjunto PDF
 */
export async function sendMailToProvider({
  to,
  cc = "info@repuestoselcholo.com.ar",
  subject,
  html,
  attachmentBuf,
  attachmentName = "ticket_devolucion.pdf"
}) {
  console.log("[MAILER] Preparando envío…");  
  console.log("[MAILER] Destinatario:", to);

  if (!to) {
    console.error("[MAILER ERROR] No se proporcionó 'to' (email del proveedor).");
    throw new Error("Email del proveedor NO encontrado.");
  }

  if (!MAIL_PASS) {
    console.error("[MAILER ERROR] MAIL_PASS no existe. NO se puede enviar.");
    return false;
  }

  const mailOptions = {
    from: `"Repuestos El Cholo" <${MAIL_USER}>`,
    to,
    cc,
    subject,
    html,
    attachments: [
      {
        filename: attachmentName,
        content: attachmentBuf
      }
    ]
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("[MAILER] CORREO ENVIADO OK:", result.messageId);
    return true;

  } catch (error) {
    console.error("[MAILER] ERROR AL ENVIAR:", error.message);
    console.error(error);
    return false;
  }
}
