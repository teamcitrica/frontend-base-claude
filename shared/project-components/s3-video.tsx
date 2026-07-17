"use client";

import React, { useEffect, useState } from "react";
import { Text } from "citrica-ui-toolkit";

type S3VideoProps = {
  videoKey: string;
  className?: string;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  poster?: string;
  fill?: boolean;
};

const S3Video = ({
  videoKey,
  className,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  poster,
  fill = false,
}: S3VideoProps) => {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setUrl(null);
    setError(null);

    const load = async () => {
      try {
        const res = await fetch(
          `/api/s3/presigned?key=${encodeURIComponent(videoKey)}`,
        );

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));

          throw new Error(data.error || `Error ${res.status}`);
        }

        const { url: signedUrl } = await res.json();

        if (!cancelled) setUrl(signedUrl);
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "No se pudo cargar el video.",
          );
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [videoKey]);

  if (error || !url) {
    return (
      <div
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.05)",
          ...(fill ? { position: "absolute", inset: 0 } : { minHeight: 160 }),
        }}
      >
        <Text as="p" variant="body">
          {error ?? "Cargando video…"}
        </Text>
      </div>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      playsInline
      autoPlay={autoPlay}
      className={className}
      controls={controls}
      loop={loop}
      muted={muted}
      poster={poster}
      src={url}
      style={
        fill
          ? {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }
          : { width: "100%", height: "auto", display: "block" }
      }
    />
  );
};

export default S3Video;
