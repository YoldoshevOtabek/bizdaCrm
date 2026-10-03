import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import type { ProductDetails } from "../types/product";

const useProductDetails = (id: string | null) => {
  const { data, isLoading } = useQuery({
    queryKey: ["product-details", id],
    queryFn: () =>
      api.get(`/admin/products/${id}`).then((res) => res?.data?.data as ProductDetails),
    enabled: !!id,
  });

  return { data, isLoading };
};

export default useProductDetails;
