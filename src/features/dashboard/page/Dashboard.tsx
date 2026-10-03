import TotalDashboard from "../components/layout/TotalDashboard";
import ReportDashboard from "../components/layout/ReportDashboard";
import CountryDashboard from "../components/layout/CountryDashboard";
import TopProducts from "../components/layout/TopProducts";
import BestProduct from "../components/layout/BestProduct";
import { QuickAddCategories, QuickAddProducts } from "../components/layout/AddNewProduct";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <TotalDashboard />
      <div className="grid grid-cols-1 items-stretch gap-3.5 xl:grid-cols-[minmax(0,1.7fr)_minmax(260px,0.9fr)]">
        <ReportDashboard />
        <CountryDashboard />
      </div>
      <div className="grid grid-cols-1 items-stretch gap-3.5 xl:grid-cols-2">
        <BestProduct />
        <TopProducts />
      </div>
      <div className="grid grid-cols-1 items-stretch gap-3.5 md:grid-cols-2">
        <QuickAddCategories />
        <QuickAddProducts />
      </div>
    </div>
  );
}
