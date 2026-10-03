import { useState } from "react";
import { PlusCircle } from "lucide-react";
import useOpenCreateQuery from "../../../hooks/useOpenCreateQuery";
import BrandFormModal from "./BrandFormModal";

export default function AddBrand() {
  const [open, setOpen] = useState(false);
  useOpenCreateQuery(() => setOpen(true));

  return (
    <>
      <button type="button" className="btn-primary" onClick={() => setOpen(true)}>
        <PlusCircle size={18} />
        Add Brand
      </button>
      <BrandFormModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
