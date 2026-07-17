import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";

import { s3Client, S3_BUCKET } from "@/shared/utils/s3";

// Hosts extra permitidos además del propio dominio (coma-separados).
const EXTRA_HOSTS = (process.env.ALLOWED_VIDEO_HOSTS || "")
  .split(",")
  .map((h) => h.trim())
  .filter(Boolean);

function refererAllowed(request: NextRequest): boolean {
  const referer = request.headers.get("referer");

  if (!referer) return false;

  try {
    const refHost = new URL(referer).host;

    return refHost === request.nextUrl.host || EXTRA_HOSTS.includes(refHost);
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  if (!refererAllowed(request)) {
    return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  }

  const key = request.nextUrl.searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "Falta el parámetro 'key'." }, { status: 400 });
  }

  const range = request.headers.get("range") ?? undefined;

  try {
    const s3res = await s3Client.send(
      new GetObjectCommand({ Bucket: S3_BUCKET, Key: key, Range: range }),
    );

    const headers = new Headers();

    headers.set("Content-Type", s3res.ContentType || "video/mp4");
    headers.set("Accept-Ranges", "bytes");
    headers.set("Cache-Control", "private, no-store");
    if (s3res.ContentLength != null) {
      headers.set("Content-Length", String(s3res.ContentLength));
    }
    if (s3res.ContentRange) headers.set("Content-Range", s3res.ContentRange);

    const body = s3res.Body as { transformToWebStream: () => ReadableStream };

    return new Response(body.transformToWebStream(), {
      status: range ? 206 : 200,
      headers,
    });
  } catch (error) {
    console.error("Error sirviendo video:", error);

    return NextResponse.json(
      { error: "No se pudo servir el video." },
      { status: 500 },
    );
  }
}
