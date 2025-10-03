import { Navigate } from "react-router-dom";
import useToyotaStore from "../store/ToyotaStore";
// import { getToken, removeToken } from "../utils/Token";



const ProtectedRoute = ({ children }) => {
  // const token = getToken();
  const token = useToyotaStore.getState().getToken();
  const removeToken = useToyotaStore.getState().removeToken;

  if (!token) {
    removeToken(); // ถ้า token หมดอายุ ลบออก
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

