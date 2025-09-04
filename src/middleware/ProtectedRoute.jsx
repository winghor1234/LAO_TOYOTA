import { Navigate } from "react-router-dom";
import { getToken, removeToken } from "../utils/Token";


const ProtectedRoute = ({ children }) => {
  const token = getToken();

  if (!token) {
    removeToken(); // ถ้า token หมดอายุ ลบออก
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
