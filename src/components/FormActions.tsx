import { Button } from "antd";

export default function FormActions({
  onCancel,
  loading,
  submitLabel,
}: {
  onCancel: () => void;
  loading?: boolean;
  submitLabel: string;
}) {
  return (
    <div className="mt-2 flex justify-end gap-2 pt-2">
      <Button onClick={onCancel}>Cancel</Button>
      <Button type="primary" htmlType="submit" loading={loading}>
        {submitLabel}
      </Button>
    </div>
  );
}
