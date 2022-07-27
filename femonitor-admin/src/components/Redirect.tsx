import { Navigate } from "react-router-dom";

export function Redirect({ to }: { to: string }) {
  return <Navigate to={to}></Navigate>;
}
