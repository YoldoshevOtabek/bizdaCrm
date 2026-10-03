import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import type { UploadProps } from "antd";
import { uploadFile } from "../../../services/upload";

type UploadFileFieldProps = {
  value?: string;
  onChange?: (url?: string) => void;
  folder?: string;
};

export default function UploadFile({
  value,
  onChange,
  folder = "categories",
}: UploadFileFieldProps) {
  const customRequest: UploadProps["customRequest"] = async (options) => {
    try {
      const url = await uploadFile(options.file, folder);
      onChange?.(url);
      options.onSuccess?.(url);
      message.success("Fayl yuklandi");
    } catch (error) {
      const text =
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Fayl yuklanmadi";
      message.error(text);
      options.onError?.(error as Error);
    }
  };

  return (
    <Upload
      maxCount={1}
      customRequest={customRequest}
      onRemove={() => onChange?.(undefined)}
      fileList={
        value
          ? [
              {
                uid: value,
                name: value.split("/").pop() || "file",
                status: "done",
                url: value,
              },
            ]
          : []
      }
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
}
