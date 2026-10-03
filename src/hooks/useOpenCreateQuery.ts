import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export default function useOpenCreateQuery(open: () => void) {
  const [searchParams, setSearchParams] = useSearchParams();
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    if (searchParams.get("create") !== "1") return;
    openRef.current();
    const next = new URLSearchParams(searchParams);
    next.delete("create");
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);
}
