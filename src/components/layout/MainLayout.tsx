import Main from "./Main";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />
      <Main />
    </div>
  );
}
