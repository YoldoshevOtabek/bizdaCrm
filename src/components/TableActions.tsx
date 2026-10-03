import { Dropdown, Popconfirm } from "antd";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

type ExtraAction = {
  key: string;
  label: string;
  icon?: ReactNode;
  danger?: boolean;
  confirm?: string;
  onClick: () => void;
};

export default function TableActions({
  onView,
  onEdit,
  onDelete,
  deleteTitle = "Delete this item?",
  extra = [],
}: {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  deleteTitle?: string;
  extra?: ExtraAction[];
}) {
  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      popupRender={() => (
        <div className="action-menu">
          {onView ? (
            <button type="button" className="action-menu-item" onClick={onView}>
              <Eye size={14} />
              View
            </button>
          ) : null}
          {onEdit ? (
            <button type="button" className="action-menu-item" onClick={onEdit}>
              <Pencil size={14} />
              Edit
            </button>
          ) : null}
          {extra.map((item) =>
            item.confirm ? (
              <Popconfirm
                key={item.key}
                title={item.confirm}
                okText="Yes"
                cancelText="No"
                onConfirm={item.onClick}
              >
                <button
                  type="button"
                  className={`action-menu-item ${item.danger ? "is-danger" : ""}`}
                >
                  {item.icon}
                  {item.label}
                </button>
              </Popconfirm>
            ) : (
              <button
                key={item.key}
                type="button"
                className={`action-menu-item ${item.danger ? "is-danger" : ""}`}
                onClick={item.onClick}
              >
                {item.icon}
                {item.label}
              </button>
            ),
          )}
          {onDelete ? (
            <Popconfirm
              title={deleteTitle}
              description="This action cannot be undone."
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
              onConfirm={onDelete}
            >
              <button type="button" className="action-menu-item is-danger">
                <Trash2 size={14} />
                Delete
              </button>
            </Popconfirm>
          ) : null}
        </div>
      )}
    >
      <button type="button" className="icon-btn" aria-label="Actions">
        <MoreHorizontal size={16} />
      </button>
    </Dropdown>
  );
}
