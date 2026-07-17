"use client";

import React, { useState } from "react";
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
  const [error, setError] = useState(false);

  const src = `/api/s3/video?key=${encodeURIComponent(videoKey)}`;

  if (error) {
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
          No se pudo cargar el video.
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
      src={src}
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
      onError={() => setError(true)}
    />
  );
};

export default S3Video;
