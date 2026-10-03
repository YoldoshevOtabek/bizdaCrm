import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableActions from "../../../components/TableActions";
import useDeleteBrand from "../hooks/useDeleteBrand";
import type { Brand } from "../types/brand";
import BrandFormModal from "./BrandFormModal";

export default function BrandActions({ data }: { data: Brand }) {
  const navigate = useNavigate();
  const { mutate } = useDeleteBrand();
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <TableActions
        onView={() => navigate(`/brands/${data.id}`)}
        onEdit={() => setEditOpen(true)}
        onDelete={() => mutate(data.id)}
        deleteTitle="Delete this brand?"
      />
      <BrandFormModal
        open={editOpen}
        brand={data}
        onClose={() => setEditOpen(false)}
      />
    </>
  );
}
