import PageHeader from "../../../components/PageHeader";
import AddProducts from "../components/AddProducts";
import ProductTable from "../components/ProductTable";

export default function Products() {
  return (
    <div>
      <PageHeader
        title="Products"
        subtitle="Manage catalog, stock and pricing"
        extra={<AddProducts />}
      />
      <div className="card overflow-hidden">
        <div className="table-scroll">
          <ProductTable />
        </div>
      </div>
    </div>
  );
}
