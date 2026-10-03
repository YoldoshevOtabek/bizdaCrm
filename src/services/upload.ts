type UploadResponse = {
  success?: boolean;
  message?: string;
  data?: { url?: string };
  url?: string;
};

const IMAGE_TYPES: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
  avif: "image/avif",
  bmp: "image/bmp",
};

function extensionFromName(name?: string) {
  const match = name?.toLowerCase().match(/\.([a-z0-9]+)$/);
  return match?.[1] || "";
}

function mimeFromName(name?: string) {
  return IMAGE_TYPES[extensionFromName(name)] || "";
}

export function toImageFile(input: unknown): File {
  const raw = input as {
    originFileObj?: File;
    name?: string;
    type?: string;
  };

  const source =
    raw?.originFileObj instanceof Blob
      ? raw.originFileObj
      : input instanceof Blob
        ? input
        : null;

  if (!source) {
    throw new Error("Invalid file");
  }

  const name =
    (source instanceof File && source.name) ||
    raw.name ||
    "image.png";
  const type =
    source.type ||
    raw.type ||
    mimeFromName(name) ||
    "image/png";
  const safeName = extensionFromName(name) ? name : `${name}.png`;

  return new File([source], safeName, { type });
}

export async function uploadFile(input: unknown, folder = "categories") {
  const file = toImageFile(input);
  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("folder", folder);

  const token = localStorage.getItem("crmAccessToken");
  const baseURL = String(import.meta.env.VITE_REACT_BASE_URL || "").replace(/\/$/, "");
  const response = await fetch(`${baseURL}/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });

  const data = (await response.json()) as UploadResponse;
  const url = data?.data?.url || data?.url;

  if (!response.ok || !url) {
    const error = new Error(data?.message || "Upload failed") as Error & {
      response?: { data: UploadResponse };
    };
    error.response = { data };
    throw error;
  }

  return url;
}
