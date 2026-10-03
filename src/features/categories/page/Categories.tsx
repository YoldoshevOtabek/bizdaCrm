import PageHeader from "../../../components/PageHeader";
import AddCategoies from "../components/layout/AddCategoies";
import TableCategories from "../components/layout/TableCategories";

export default function Categories() {
  return (
    <div>
      <PageHeader
        title="Categories"
        subtitle="Organize products by category"
        extra={<AddCategoies />}
      />
      <div className="card overflow-hidden">
        <div className="table-scroll">
          <TableCategories />
        </div>
      </div>
    </div>
  );
}
