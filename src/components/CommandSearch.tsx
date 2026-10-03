import { Modal } from "antd";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { commandItems, type CommandGroup } from "../constants/commandSearch";

const groups: CommandGroup[] = ["Pages", "Create"];

const matches = (query: string, item: (typeof commandItems)[number]) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    item.label.toLowerCase().includes(q) ||
    item.hint.toLowerCase().includes(q) ||
    item.group.toLowerCase().includes(q) ||
    item.keywords.some((word) => word.includes(q))
  );
};

const shortcutLabel =
  typeof navigator !== "undefined" && /mac/i.test(navigator.platform)
    ? "⌘K"
    : "Ctrl K";

export default function CommandSearch() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(
    () => commandItems.filter((item) => matches(query, item)),
    [query],
  );

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  const go = (path: string) => {
    navigate(path);
    close();
  };

  const onModalKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((prev) => (prev + 1) % results.length);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((prev) => (prev - 1 + results.length) % results.length);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      go(results[active].path);
    }
  };

  return (
    <>
      <button
        type="button"
        className="icon-btn sm:hidden"
        onClick={() => setOpen(true)}
        aria-label="Search pages"
      >
        <Search size={16} />
      </button>
      <button
        type="button"
        className="search-field search-trigger hidden w-[168px] sm:flex"
        onClick={() => setOpen(true)}
      >
        <Search size={15} className="shrink-0 text-muted" />
        <span className="min-w-0 flex-1 truncate text-left text-[13px] text-muted">
          Search
        </span>
        <kbd className="search-kbd">{shortcutLabel}</kbd>
      </button>

      <Modal
        open={open}
        onCancel={close}
        footer={null}
        closable={false}
        width={460}
        centered
        className="command-search-modal"
        destroyOnHidden
        transitionName=""
        maskTransitionName=""
      >
        <div className="command-search" onKeyDown={onModalKeyDown}>
          <div className="command-search-bar">
            <Search size={16} className="text-muted" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Sahifa yoki create qidiring..."
            />
            <kbd className="search-kbd">ESC</kbd>
          </div>

          <div className="command-search-list">
            {results.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-muted">
                Hech narsa topilmadi
              </p>
            ) : (
              groups.map((group) => {
                const items = results.filter((item) => item.group === group);
                if (!items.length) return null;
                return (
                  <div key={group} className="command-search-group">
                    <p className="command-search-label">{group}</p>
                    {items.map((item) => {
                      const index = results.indexOf(item);
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`command-search-item ${
                            index === active ? "is-active" : ""
                          }`}
                          onMouseEnter={() => setActive(index)}
                          onClick={() => go(item.path)}
                        >
                          <span className="command-search-ico">
                            <Icon size={16} />
                          </span>
                          <span className="min-w-0 flex-1 text-left">
                            <span className="block truncate text-[13px] font-medium">
                              {item.label}
                            </span>
                            <span className="block truncate text-[11px] text-muted">
                              {item.hint}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
