"use client";

import { HydrateProps, Hydrate as RQHydrate } from "@tanstack/react-query";

export function ClientHydrate(props: HydrateProps) {
  return <RQHydrate {...props} />;
}
