import { Ban, CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TableActions from "../../../components/TableActions";
import useUpdateCustomerStatus from "../hooks/useUpdateCustomerStatus";

export default function CustomerActions({
  data,
}: {
  data: { id: string; isActive: boolean };
}) {
  const navigate = useNavigate();
  const { updateCustomerStatus } = useUpdateCustomerStatus();

  return (
    <TableActions
      onView={() => navigate(`/customers/${data.id}`)}
      extra={[
        {
          key: "status",
          label: data.isActive ? "Block customer" : "Unblock customer",
          icon: data.isActive ? <Ban size={14} /> : <CircleCheck size={14} />,
          danger: data.isActive,
          confirm: data.isActive
            ? "Block this customer?"
            : "Unblock this customer?",
          onClick: () =>
            updateCustomerStatus({
              values: { isActive: !data.isActive },
              id: data.id,
            }),
        },
      ]}
    />
  );
}
