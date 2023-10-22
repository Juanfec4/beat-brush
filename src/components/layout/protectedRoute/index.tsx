import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useStore from "../../../zustand/store";

interface ProtectedRouteProps {
  children: ReactNode;
}
const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const state = useStore();

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
