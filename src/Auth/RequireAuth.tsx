import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { selectIsLoggedIn } from "../redux/auth/authSelectors.selector";

export default function RequireAuth() {
  const isAuthenticated = useAppSelector(selectIsLoggedIn);
  console.log(isAuthenticated)
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={"auth/login"} state={{ from: location }} replace />;
  }
  return <Outlet />;
}
