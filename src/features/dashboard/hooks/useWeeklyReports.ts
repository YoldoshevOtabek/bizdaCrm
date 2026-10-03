import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

export type WeekParam = "this" | "last";

const useWeeklyReports = (week: WeekParam = "this") => {
  const { data: weeklyReports, isLoading } = useQuery({
    queryKey: ["weekly-report", week],
    queryFn: () =>
      api
        .get("/admin/dashboard/weekly-report", {
          params: { week },
        })
        .then((res) => res?.data),
    placeholderData: (previous) => previous,
  });

  return { weeklyReports, isLoading };
};

export default useWeeklyReports;
