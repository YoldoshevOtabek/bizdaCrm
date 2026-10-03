import { useEffect, useState } from "react";

const blobCache = new Map<string, string>();
const inflight = new Map<string, Promise<string>>();

function isDirectSrc(url?: string) {
  if (!url) return true;
  return (
    url.startsWith("blob:") ||
    url.startsWith("data:") ||
    url.startsWith("/") ||
    url.startsWith(".")
  );
}

export function resolveRemoteSrc(url?: string) {
  if (!url || isDirectSrc(url)) return Promise.resolve(url || "");
  const cached = blobCache.get(url);
  if (cached) return Promise.resolve(cached);
  const pending = inflight.get(url);
  if (pending) return pending;

  const request = fetch(url, { mode: "cors" })
    .then((response) => {
      if (!response.ok) throw new Error("Image fetch failed");
      return response.blob();
    })
    .then((blob) => {
      const src = URL.createObjectURL(blob);
      blobCache.set(url, src);
      inflight.delete(url);
      return src;
    })
    .catch(() => {
      inflight.delete(url);
      return url;
    });

  inflight.set(url, request);
  return request;
}

export function cacheRemoteSrc(url: string, blobSrc: string) {
  blobCache.set(url, blobSrc);
}

export function useRemoteSrc(url?: string, fallback?: string) {
  const [src, setSrc] = useState(fallback);

  useEffect(() => {
    if (!url) {
      setSrc(fallback);
      return;
    }
    if (isDirectSrc(url)) {
      setSrc(url);
      return;
    }
    let cancelled = false;
    resolveRemoteSrc(url).then((resolved) => {
      if (!cancelled) setSrc(resolved || fallback);
    });
    return () => {
      cancelled = true;
    };
  }, [url, fallback]);

  return src || fallback;
}
