import PageHeader from "../../../components/PageHeader";
import AddBrand from "../components/AddBrand";
import BrandTable from "../components/BrandTable";

export default function Brands() {
  return (
    <div>
      <PageHeader
        title="Brands"
        subtitle="Manage product brands"
        extra={<AddBrand />}
      />
      <div className="card overflow-hidden">
        <div className="table-scroll">
          <BrandTable />
        </div>
      </div>
    </div>
  );
}
