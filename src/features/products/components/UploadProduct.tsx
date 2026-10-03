import { Button, Image, Select, Upload, type UploadFile } from "antd";
import { useState } from "react";
import {
  CloseCircleOutlined,
  PictureOutlined,
  PlusOutlined,
  SyncOutlined,
} from "@ant-design/icons";

export default function UploadProduct() {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "1",
      name: "image1.png",
      status: "done",
      url: "https://minapi.beemarket.uz/prod-media/productImages/1718099428hENpsJcAbGK8.webp",
    },
    {
      uid: "2",
      name: "image2.png",
      status: "done",
      url: "https://tezz.uz/uploads/images/product/594/thumbs/215656_1-10501050.jpg",
    },
    {
      uid: "3",
      name: "image3.png",
      status: "done",
      url: "https://asset.openshop.uz/storage/uploads/products/photos/202301/GaC73um0EwsIcuPWTtHnaBzK7bxMNJvRuKUrpJsg.jpg",
    },
  ]);

  const [selectedImage, setSelectedImage] = useState<string>(
    fileList[0]?.url || "",
  );

  return (
    <div className="card p-6">
      <h2 className="text-[22px] font-bold">Upload Product Image</h2>
      <h3 className="mt-5 mb-3 text-[15px] font-bold">Product Image</h3>
      <div className="relative rounded-xl border border-line p-3">
        <div className="flex h-72 items-center justify-center">
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="Product"
              className="max-h-60 object-contain"
              preview={false}
            />
          ) : (
            <span className="text-muted">Rasm yuklanmagan</span>
          )}
        </div>
        <div className="absolute bottom-3 left-3">
          <Upload showUploadList={false} beforeUpload={() => false}>
            <Button icon={<PictureOutlined />}>Browse</Button>
          </Upload>
        </div>
        <div className="absolute right-3 bottom-3">
          <Upload showUploadList={false} beforeUpload={() => false}>
            <Button icon={<SyncOutlined />}>Replace</Button>
          </Upload>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        {fileList.map((item) => (
          <div
            key={item.uid}
            className="relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-xl border border-line p-2"
            onClick={() => setSelectedImage(item.url || "")}
          >
            <img src={item.url} alt={item.name} className="h-13 w-13 object-cover" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFileList((d) => d.filter((file) => file.uid !== item.uid));
              }}
              className="absolute top-1 right-1 cursor-pointer rounded-full bg-surface text-muted hover:text-red-500"
            >
              <CloseCircleOutlined className="text-lg" />
            </button>
          </div>
        ))}
        <Upload
          listType="picture-card"
          showUploadList={false}
          beforeUpload={() => false}
          className="[&_.ant-upload]:h-24! [&_.ant-upload]:w-24! [&_.ant-upload]:rounded-xl! [&_.ant-upload]:border-dashed!"
        >
          <div className="flex flex-col items-center justify-center text-brand">
            <PlusOutlined className="mb-1 rounded-full bg-brand p-1 text-xl text-[var(--app-primary-text)]" />
            <span className="text-xs font-semibold">Add Image</span>
          </div>
        </Upload>
      </div>
      <h2 className="mt-8 mb-5 text-[22px] font-bold">Categories</h2>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Product Categories</label>
        <Select
          size="large"
          placeholder="Select your product"
          className="w-full"
          options={[
            { value: "electronics", label: "Electronics" },
            { value: "smartphones", label: "Smartphones" },
          ]}
        />
      </div>
      <div className="mt-5 mb-5">
        <label className="mb-1.5 block text-sm font-medium">Product Tag</label>
        <Select
          size="large"
          placeholder="Select your product"
          className="w-full"
          options={[
            { value: "electronics", label: "Electronics" },
            { value: "smartphones", label: "Smartphones" },
          ]}
        />
      </div>
      <div>
        <label className="mb-3 text-[15px] font-bold">Select your color</label>
        <div className="mt-3 flex gap-3">
          {["#D7EACB", "#ECD3D6", "#D5DDE0", "#ECE7C9", "#464A4D"].map((color) => (
            <div
              key={color}
              className="h-12 w-12 rounded-xl border border-line"
              style={{ background: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
