"use client";

import Image from "next/image";
import { useState } from "react";
import { IMAGES, type ImageKey } from "@/data/images";
import { useT } from "@/lib/LanguageProvider";
import { cn } from "@/lib/utils";
import { WeaveMark } from "./WeaveMark";

interface Props {
  name: ImageKey;
  sizes?: string;
  priority?: boolean;
  duotone?: boolean;
  className?: string;
  imgClassName?: string;
}

/** Fills its (relative) parent. Falls back to an indigo-to-linen gradient with the weave mark. */
export function SafeImage({ name, sizes = "100vw", priority, duotone = true, className, imgClassName }: Props) {
  const { lang } = useT();
  const [failed, setFailed] = useState(false);
  const asset = IMAGES[name];

  if (failed) {
    return (
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo to-linen",
          className,
        )}
        role="img"
        aria-label={asset.alt[lang]}
      >
        <WeaveMark className="h-12 w-12 opacity-80" />
      </div>
    );
  }

  return (
    <div className={cn("absolute inset-0", duotone && "duotone", className)}>
      <Image
        src={asset.src}
        alt={asset.alt[lang]}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        onError={() => setFailed(true)}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
