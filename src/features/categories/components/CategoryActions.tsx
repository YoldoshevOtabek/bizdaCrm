import { useNavigate } from "react-router-dom";
import TableActions from "../../../components/TableActions";
import useDeleteCategory from "../hooks/useDeleteCategory";

export default function CategoryActions({ data }: { data: { id: string } }) {
  const navigate = useNavigate();
  const { mutate } = useDeleteCategory();

  return (
    <TableActions
      onView={() => navigate(`/categories/${data.id}`)}
      onEdit={() => navigate(`/categories/${data.id}`)}
      onDelete={() => mutate(data.id)}
      deleteTitle="Delete this category?"
    />
  );
}
