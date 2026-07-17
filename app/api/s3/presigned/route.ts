
import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { s3Client, S3_BUCKET } from "@/shared/utils/s3";

const URL_EXPIRES_IN = 60 * 60;

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");

  if (!key) {
    return NextResponse.json(
      { error: "Falta el parámetro 'key' (ruta del objeto en el bucket)." },
      { status: 400 },
    );
  }

  try {
    const command = new GetObjectCommand({ Bucket: S3_BUCKET, Key: key });
    const url = await getSignedUrl(s3Client, command, {
      expiresIn: URL_EXPIRES_IN,
    });

    return NextResponse.json({ url, expiresIn: URL_EXPIRES_IN });
  } catch (error) {
    console.error("Error generando presigned URL:", error);

    return NextResponse.json(
      { error: "No se pudo generar la URL firmada." },
      { status: 500 },
    );
  }
}
