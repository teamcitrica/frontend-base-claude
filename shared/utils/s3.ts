// ============================================================
// Cliente de AWS S3 (bucket privado de videos).
// SOLO se importa desde código de servidor (route handlers, server
// actions, server components). Las credenciales viven en .env.local
// y NUNCA deben exponerse al cliente (sin prefijo NEXT_PUBLIC_).
// ============================================================
import "server-only";

import { S3Client } from "@aws-sdk/client-s3";

// Lee y valida las variables de entorno una sola vez al cargar el módulo.
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

export const S3_BUCKET = process.env.AWS_S3_BUCKET;

if (!region || !accessKeyId || !secretAccessKey || !S3_BUCKET) {
  throw new Error(
    "Faltan variables de entorno de AWS S3. Revisa AWS_REGION, " +
      "AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY y AWS_S3_BUCKET en .env.local.",
  );
}

export const s3Client = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
});
