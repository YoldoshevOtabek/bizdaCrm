import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-canvas px-6 text-center">
      <div>
        <p className="text-sm font-bold tracking-[0.2em] text-brand uppercase">
          404
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 text-muted">
          This page does not exist or was moved.
        </p>
        <Link to="/dashboard" className="btn-primary mt-8 inline-flex">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
