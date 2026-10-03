import { Form } from "antd";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailHeader from "../../../components/DetailHeader";
import FormActions from "../../../components/FormActions";
import Spinner from "../../../components/Spinner";
import ProductFormFields from "../components/ProductFormFields";
import useProductDetails from "../hooks/useProductDetails";
import useUpdateProduct from "../hooks/useUpdateProduct";
import {
  toProductFormValues,
  toProductPayload,
  type ProductFormValues,
} from "../types/product";

export default function ProductDeatils() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useProductDetails(id || null);
  const [form] = Form.useForm<ProductFormValues>();
  const { updateProduct, isPending } = useUpdateProduct();
  const slugTouched = useRef(true);

  useEffect(() => {
    if (!data) return;
    slugTouched.current = true;
    form.setFieldsValue(toProductFormValues(data));
  }, [data, form]);

  const handleSubmit = (values: ProductFormValues) => {
    updateProduct({ payload: toProductPayload(values), id });
  };

  if (isLoading) {
    return <Spinner variant="page" />;
  }

  if (!data) {
    return <div className="card text-sm text-muted">Product topilmadi</div>;
  }

  return (
    <div className="space-y-4">
      <DetailHeader
        title={data.name}
        subtitle="Update catalog information"
        backTo="/products"
        extra={
          <button
            type="button"
            className="btn-primary h-9 px-4 text-sm"
            disabled={isPending}
            onClick={() => form.submit()}
          >
            Save Changes
          </button>
        }
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark="optional"
      >
        <ProductFormFields slugTouched={slugTouched} enableAutoSlug={false} />
        <div className="card mt-4">
          <FormActions
            onCancel={() => navigate("/products")}
            loading={isPending}
            submitLabel="Save Changes"
          />
        </div>
      </Form>
    </div>
  );
}
