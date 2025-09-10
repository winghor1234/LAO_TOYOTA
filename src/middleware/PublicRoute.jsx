import { Navigate } from "react-router-dom";
import useToyotaStore from "../store/ToyotaStore";
// import { getToken } from "../utils/Token";

const PublicRoute = ({ children }) => {
  // const token = getToken();
  const token = useToyotaStore.getState().getToken();

  if (token) {
    // มี token แล้ว → เด้งไป dashboard
    return <Navigate to="/user/dashboard" replace />;
  }

  // ไม่มี token → เข้าได้
  return children;
};

export default PublicRoute;

