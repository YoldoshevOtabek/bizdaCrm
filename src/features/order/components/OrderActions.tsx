import { useNavigate } from "react-router-dom";
import TableActions from "../../../components/TableActions";

export default function OrderActions({ data }: { data: { key: string } }) {
  const navigate = useNavigate();

  return (
    <TableActions
      onView={() => navigate(`/order/${data.key}`)}
    />
  );
}
