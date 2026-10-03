import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
} from "antd";
import PublishProduct from "./PublishProduct";
import SaveDraft from "./SaveDraft";

export default function BasicDetails() {
  const [form] = Form.useForm();

  return (
    <div className="card p-6">
      <h2 className="mb-6 text-[22px] font-bold">Basic Details</h2>

      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={(values) => console.log(values)}
      >
        <Form.Item
          label="Product Name"
          name="product"
          rules={[{ required: true, message: "Product kiriting!" }]}
        >
          <Input size="large" placeholder="iPhone 15" />
        </Form.Item>

        <Form.Item
          label="Product Description"
          name="description"
          rules={[{ required: true, message: "Description kiriting!" }]}
        >
          <Input size="large" placeholder="Description" />
        </Form.Item>

        <h2 className="mt-8 mb-6 text-[22px] font-bold">Pricing</h2>

        <Form.Item
          label="Product Price"
          name="price"
          rules={[{ required: true, message: "Price kiriting!" }]}
        >
          <Input size="large" type="number" placeholder="$999.89" />
        </Form.Item>

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[1.26fr_1fr]">
          <Form.Item
            label={
              <span>
                Discounted Price{" "}
                <span className="font-medium text-muted">(Optional)</span>
              </span>
            }
          >
            <div className="flex items-center justify-between rounded-xl border border-line px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-canvas text-muted">
                  $
                </div>
                <InputNumber defaultValue={99} controls={false} variant="borderless" />
              </div>
              <span className="text-sm text-muted">Sale= $900.89</span>
            </div>
          </Form.Item>

          <Form.Item label="Tax Included">
            <Radio.Group defaultValue="yes" className="flex! flex-col! gap-1">
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <h2 className="mb-3 text-[15px] font-bold">Schedule</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Form.Item name="startDate" className="mb-0">
            <DatePicker placeholder="Start" className="w-full" size="large" />
          </Form.Item>
          <Form.Item name="endDate" className="mb-0">
            <DatePicker placeholder="End" className="w-full" size="large" />
          </Form.Item>
        </div>

        <h2 className="mt-8 mb-5 text-[22px] font-bold">Inventory</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Form.Item
            label="Stock Quantity"
            name="stock"
            rules={[{ required: true, message: "Stock kiriting!" }]}
          >
            <Input size="large" type="number" placeholder="Unlimited" />
          </Form.Item>
          <Form.Item
            label="Stock Status"
            name="status"
            rules={[{ required: true, message: "Status kiriting!" }]}
          >
            <Select
              size="large"
              defaultValue="On Backorder"
              options={[
                { value: "On Backorder", label: "On Backorder" },
                { value: "In Stock", label: "In Stock" },
              ]}
            />
          </Form.Item>
        </div>

        <div className="flex items-center gap-3">
          <Switch defaultChecked />
          <span className="text-lg font-semibold">Unlimited</span>
        </div>

        <Checkbox defaultChecked className="mt-5!">
          Highlight this product in a featured section.
        </Checkbox>

        <div className="mt-8 flex justify-end gap-3">
          <SaveDraft />
          <PublishProduct />
        </div>
      </Form>
    </div>
  );
}
