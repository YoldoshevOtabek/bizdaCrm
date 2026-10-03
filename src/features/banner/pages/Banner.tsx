import PageHeader from "../../../components/PageHeader";
import AddBanners from "../components/AddBanners";
import BannerTabel from "../components/BannerTabel";

export default function Banner() {
  return (
    <div>
      <PageHeader
        title="Banners"
        subtitle="Manage homepage banners"
        extra={<AddBanners />}
      />
      <div className="card overflow-hidden">
        <div className="table-scroll">
          <BannerTabel />
        </div>
      </div>
    </div>
  );
}
