import Context from "./Context";
import Header from "./Header";

export default function Main() {
  return (
    <main className="ml-[var(--sidebar-w)] flex min-h-screen min-w-0 flex-1 flex-col bg-canvas text-ink transition-[margin] duration-300">
      <Header />
      <Context />
    </main>
  );
}
