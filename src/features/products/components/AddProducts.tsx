import { useRef, useState } from "react";
import { Drawer, Form, Button } from "antd";
import { PlusCircle, Maximize2, Minimize2 } from "lucide-react";
import useOpenCreateQuery from "../../../hooks/useOpenCreateQuery";
import ProductFormFields from "./ProductFormFields";
import useCreateProduct from "../hooks/useCreateProduct";
import { toProductPayload, type ProductFormValues } from "../types/product";

export default function AddProducts() {
  const [open, setOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const slugTouched = useRef(false);
  const [form] = Form.useForm<ProductFormValues>();
  const { createProduct, isPending } = useCreateProduct();

  const handleOpen = () => {
    slugTouched.current = false;
    setOpen(true);
  };
  useOpenCreateQuery(handleOpen);

  const handleClose = () => {
    form.resetFields();
    setOpen(false);
    setFullScreen(false);
  };

  const handleSubmit = (values: ProductFormValues) => {
    createProduct(toProductPayload(values), {
      onSuccess: () => {
        form.resetFields();
        setOpen(false);
        setFullScreen(false);
      },
    });
  };

  return (
    <>
      <button type="button" onClick={handleOpen} className="btn-primary">
        <PlusCircle size={18} />
        Add Product
      </button>

      <Drawer
        title={
          <div>
            <h2 className="m-0 text-lg font-semibold">Add Product</h2>
            <p className="m-0 mt-1 text-xs font-normal text-muted">
              Yangi mahsulot qo'shing
            </p>
          </div>
        }
        extra={
          <button
            type="button"
            onClick={() => setFullScreen((prev) => !prev)}
            className="icon-btn h-9 w-9"
            aria-label={fullScreen ? "Exit full screen" : "Full screen"}
          >
            {fullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        }
        placement="right"
        open={open}
        onClose={handleClose}
        width={fullScreen ? "100%" : 720}
        destroyOnClose
        styles={{
          body: {
            padding: 16,
            background: "var(--app-canvas)",
          },
          header: {
            padding: "16px 20px",
            borderBottom: "1px solid var(--app-line)",
          },
          footer: {
            padding: "12px 20px",
            borderTop: "1px solid var(--app-line)",
            background: "var(--app-surface)",
          },
        }}
        footer={
          <div className="flex items-center justify-between gap-3">
            <p className="m-0 hidden text-xs text-muted sm:block">
              * bilan belgilangan maydonlar majburiy
            </p>
            <div className="ml-auto flex gap-2">
              <Button size="large" onClick={handleClose}>
                Bekor qilish
              </Button>
              <Button
                type="primary"
                size="large"
                loading={isPending}
                onClick={() => form.submit()}
              >
                Mahsulot qo'shish
              </Button>
            </div>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark="optional"
          initialValues={{
            oldPrice: 0,
            discountPercent: 0,
            stock: 0,
            lowStockThreshold: 5,
            isActive: true,
            isFeatured: false,
            isNew: false,
            isPopular: false,
            images: [],
            variants: [],
          }}
        >
          <ProductFormFields slugTouched={slugTouched} />
        </Form>
      </Drawer>
    </>
  );
}
