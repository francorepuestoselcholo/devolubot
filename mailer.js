export async function sendMailToProvider({ to, cc = "info@repuestoselcholo.com.ar", subject, html, attachmentBuf, attachmentName }) {
  console.log("DEBUG: sendMailToProvider() fue llamada");
  console.log("DEBUG: Parámetros recibidos:", { to, cc, subject, attachmentName });

  if (!to) {
    console.error("ERROR: No se proporcionó el mail del proveedor (to).");
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

  console.log("DEBUG: Intentando enviar mail...");
  console.log("DEBUG: MAIL_USER:", MAIL_USER);
  console.log("DEBUG: MAIL_PASS existe?", MAIL_PASS ? "SI" : "NO");

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("DEBUG: Mail enviado con éxito!", info);
    return info;
  } catch (error) {
    console.error("❌ ERROR REAL AL ENVIAR EL MAIL:");
    console.error(error);
    throw error;
  }
}
