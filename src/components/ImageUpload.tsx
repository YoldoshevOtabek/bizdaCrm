import { PlusOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { useEffect, useRef, useState } from "react";
import { cacheRemoteSrc, resolveRemoteSrc } from "../hooks/useRemoteSrc";
import { toImageFile, uploadFile } from "../services/upload";

type ImageUploadProps = {
  value?: string;
  onChange?: (url?: string) => void;
  disabled?: boolean;
  folder?: string;
  maxSizeMb?: number;
  shape?: "card" | "circle" | "wide";
};

export default function ImageUpload({
  value,
  onChange,
  disabled,
  folder = "categories",
  maxSizeMb = 5,
  shape = "card",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>();
  const localUrlRef = useRef<string | undefined>(undefined);

  const revokeLocal = () => {
    if (localUrlRef.current) {
      URL.revokeObjectURL(localUrlRef.current);
      localUrlRef.current = undefined;
    }
  };

  useEffect(() => {
    if (!value) {
      revokeLocal();
      setPreview(undefined);
      return;
    }

    let cancelled = false;
    resolveRemoteSrc(value).then((src) => {
      if (!cancelled && src) setPreview(src);
    });

    return () => {
      cancelled = true;
    };
  }, [value]);

  useEffect(() => () => revokeLocal(), []);

  const fileList: UploadFile[] =
    value || preview
      ? [
          {
            uid: value || "uploading",
            name: value?.split("/").pop() || "image.png",
            status: uploading ? "uploading" : "done",
            url: preview || value,
            thumbUrl: preview || value,
          },
        ]
      : [];

  const customRequest: UploadProps["customRequest"] = async (options) => {
    try {
      setUploading(true);
      const localFile = toImageFile(options.file);
      revokeLocal();
      const localUrl = URL.createObjectURL(localFile);
      localUrlRef.current = localUrl;
      setPreview(localUrl);
      const url = await uploadFile(localFile, folder);
      cacheRemoteSrc(url, localUrl);
      localUrlRef.current = undefined;
      onChange?.(url);
      options.onSuccess?.(url);
      message.success("Rasm yuklandi");
    } catch (error) {
      revokeLocal();
      setPreview(undefined);
      const text =
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Rasm yuklanmadi";
      message.error(text);
      options.onError?.(error as Error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Upload
      accept="image/*"
      listType={shape === "circle" ? "picture-circle" : "picture-card"}
      maxCount={1}
      fileList={fileList}
      disabled={disabled || uploading}
      className={shape === "wide" ? "image-upload-wide" : undefined}
      customRequest={customRequest}
      beforeUpload={(file) => {
        const type = file.type || "";
        const isImage =
          type.startsWith("image/") ||
          /\.(png|jpe?g|webp|gif|svg|avif|bmp)$/i.test(file.name);
        if (!isImage) {
          message.error("Faqat rasm yuklash mumkin");
          return Upload.LIST_IGNORE;
        }
        if (file.size > maxSizeMb * 1024 * 1024) {
          message.error(`Rasm ${maxSizeMb}MB dan kichik bo'lishi kerak`);
          return Upload.LIST_IGNORE;
        }
        return true;
      }}
      onRemove={() => {
        revokeLocal();
        setPreview(undefined);
        onChange?.(undefined);
      }}
    >
      {fileList.length >= 1 ? null : (
        <div>
          <PlusOutlined />
          <div className="mt-1 text-xs">{uploading ? "Yuklanmoqda..." : "Upload"}</div>
        </div>
      )}
    </Upload>
  );
}
