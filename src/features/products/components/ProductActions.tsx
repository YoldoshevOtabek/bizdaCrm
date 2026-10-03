import { useNavigate } from "react-router-dom";
import TableActions from "../../../components/TableActions";
import useDeleteProduct from "../hooks/useDeleteProduct";

export default function ProductActions({ data }: { data: { id: string } }) {
  const navigate = useNavigate();
  const { mutate } = useDeleteProduct();

  return (
    <TableActions
      onView={() => navigate(`/products/${data.id}`)}
      onEdit={() => navigate(`/products/${data.id}`)}
      onDelete={() => mutate(data.id)}
      deleteTitle="Delete this product?"
    />
  );
}
