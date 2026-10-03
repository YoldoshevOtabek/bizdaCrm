import { Copy, Share2, SquarePen } from "lucide-react";
import photo from "../../../../assets/img/photo.png";
import RemoteImg from "../../../../components/RemoteImg";
import { useUser } from "../../../auth/context/UserContext";

export default function ProfileDesign() {
  const { user } = useUser();

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Profile</h3>
        <div className="flex items-center gap-2 text-muted">
          <SquarePen size={18} />
          <Share2 size={18} />
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center">
        <RemoteImg
          src={user?.avatar}
          fallback={photo}
          className="mb-3 h-24 w-24 rounded-full object-cover ring-4 ring-line"
          alt=""
        />
        <h3 className="mb-1 text-lg font-bold">
          {user?.firstName} {user?.lastName}
        </h3>
        <div className="mb-2 flex items-center gap-3 text-sm text-muted">
          <p>{user?.email}</p>
          <Copy size={16} />
        </div>
      </div>
    </div>
  );
}
