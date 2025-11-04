import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { selectIsLoggedIn } from "../redux/auth/authSelectors.selector";

export default function PublicOnlyRoute() {
  const isAuthenticated = useAppSelector(selectIsLoggedIn);

  if (isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
}