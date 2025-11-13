// storage.js
import { promises as fs } from "fs";
import path from "path";

/**
 * saveTicketByRemitente
 * @param {string} baseDir - directorio base (ej: './tickets')
 * @param {string} remitenteName - nombre del remitente (usado como subcarpeta, sanitized)
 * @param {string} filename - nombre del archivo final (ej: 'ticket_ElCholo_ABC123_169...pdf')
 * @param {Buffer} buf - buffer del pdf
 * @returns {string} ruta absoluta/relativa del archivo guardado
 */
export async function saveTicketByRemitente(baseDir, remitenteName, filename, buf) {
  // limpiar remitente para usar en carpeta
  const safeRemitente = String(remitenteName || "Remitente").replace(/[<>:"\/\\|?*\x00-\x1F]/g, "_").trim() || "Remitente";
  const dir = path.join(baseDir, safeRemitente);
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, filename);
  await fs.writeFile(filePath, buf);
  return filePath;
}
