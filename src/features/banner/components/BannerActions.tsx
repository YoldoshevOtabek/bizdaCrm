import { useNavigate } from "react-router-dom";
import TableActions from "../../../components/TableActions";
import useDeleteBanner from "../hooks/useDeleteBanner";

export default function BannerActions({ data }: { data: { id: string } }) {
  const navigate = useNavigate();
  const { mutate } = useDeleteBanner();

  return (
    <TableActions
      onView={() => navigate(`/banner/${data.id}`)}
      onEdit={() => navigate(`/banner/${data.id}`)}
      onDelete={() => mutate(data.id)}
      deleteTitle="Delete this banner?"
    />
  );
}
