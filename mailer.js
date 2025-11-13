// mailer.js
import nodemailer from "nodemailer";

/**
 * Configuración del transporter usando Gmail + app password
 * Requiere:
 *   process.env.MAIL_USER   -> 'francorepuestoselcholo@gmail.com'
 *   process.env.MAIL_PASS   -> password / app password
 */
const MAIL_USER = process.env.MAIL_USER || 'francorepuestoselcholo@gmail.com';
const MAIL_PASS = process.env.MAIL_PASS || process.env.mail_pass || null; // soporte ambas formas

if (!MAIL_PASS) {
  console.warn("mailer.js: MAIL_PASS no definido en variables de entorno. El envío de mails fallará si se intenta.");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
});

/**
 * sendMailToProvider
 * @param {string} to - email del proveedor
 * @param {string} cc - email en copia (info@repuestoselcholo.com.ar)
 * @param {string} subject
 * @param {string} html - cuerpo en HTML
 * @param {Buffer} attachmentBuf - buffer del PDF
 * @param {string} attachmentName - nombre del archivo adjunto
 */
export async function sendMailToProvider({ to, cc = "info@repuestoselcholo.com.ar", subject, html, attachmentBuf, attachmentName }) {
  if (!to) {
    throw new Error("No se proporcionó 'to' (email del proveedor).");
  }

  const mailOptions = {
    from: `"Repuestos El Cholo" <${MAIL_USER}>`,
    to,
    cc,
    subject,
    html,
    attachments: []
  };

  if (attachmentBuf) {
    mailOptions.attachments.push({
      filename: attachmentName || "ticket_devolucion.pdf",
      content: attachmentBuf
    });
  }

  // Enviar
  return transporter.sendMail(mailOptions);
}
