import PageHeader from "../../../components/PageHeader";
import CustomersTable from "../components/CustomersTable";

export default function Customers() {
  return (
    <div>
      <PageHeader title="Customers" subtitle="Track customer activity and spend" />
      <div className="card overflow-hidden">
        <div className="table-scroll">
          <CustomersTable />
        </div>
      </div>
    </div>
  );
}
