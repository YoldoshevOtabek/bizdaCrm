import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import type { Customer } from "../types/customer";
import useCustomers from "./useCustomers";

const useCustomerDetails = (id: string | null) => {
  const { data: list } = useCustomers();
  const fromList = (list?.data as Customer[] | undefined)?.find((item) => item.id === id);

  const { data, isLoading } = useQuery({
    queryKey: ["customer-details", id],
    queryFn: () =>
      api.get(`/admin/customers/${id}`).then((res) => {
        const payload = res?.data;
        return (payload?.data ?? payload) as Customer;
      }),
    enabled: !!id && !fromList,
  });

  return { data: data ?? fromList, isLoading: isLoading && !fromList };
};

export default useCustomerDetails;
