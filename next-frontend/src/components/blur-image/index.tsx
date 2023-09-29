"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BlurImageProps {
  src: string;
  alt: string;
  height?: number | `${number}` | undefined;
  width?: number | `${number}` | undefined;
  style?: object;
  className?: string;
}

const BlurImage: React.FC<BlurImageProps> = ({
  src,
  alt,
  height,
  width,
  style,
  className,
  ...props
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      alt={alt}
      width={width || 75}
      height={height || 75}
      sizes="100vw"
      style={{ width: "100%", height: "auto", ...style }}
      src={src}
      className={cn(
        "duration-0 ease-in-out",
        isLoading
          ? "scale-110 blur-2xl grayscale"
          : "scale-100 blur-0 grayscale-0",
        className
      )}
      onLoadingComplete={() => setLoading(false)}
      priority
      {...props}
    />
  );
};

export default BlurImage;
