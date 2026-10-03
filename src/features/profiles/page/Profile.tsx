import PageHeader from "../../../components/PageHeader";
import ProfileChangePassword from "../components/layout/ProfileChangePassword";
import ProfileDesign from "../components/layout/ProfileDesign";
import ProfileUpdate from "../components/layout/ProfileUpdate";

export default function Profile() {
  return (
    <div>
      <PageHeader title="Profile" subtitle="Manage your account details" />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-5">
          <ProfileDesign />
          <ProfileChangePassword />
        </div>
        <ProfileUpdate />
      </div>
    </div>
  );
}
