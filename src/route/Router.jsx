
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import Appointment from "../pages/Appointment/Appointment";
import Approve from "../pages/Appointment/approve/Approve";
import Repair from "../pages/Appointment/repair/Repair";
import Cancel from "../pages/Appointment/Cancel/Cancel";
import Success from "../pages/Appointment/success/Success";
import ReceiverCarDetail from "../pages/Appointment/approve/ReceiverCarDetail";
import RepairDetails from "../pages/Appointment/repair/RepairDetails";
import SuccessDetail from "../pages/Appointment/success/SuccessDetail";
import RepairSuccess from "../pages/Appointment/repair/RepairSuccess";
import Dashboard from "../pages/dashboard/Dashboard";
import Vehicle from "../pages/vehicleInformation/Vehicle";
import ServiceInformation from "../pages/servicing/serviceInformation/ServiceInformation";
import Servicing from "../pages/servicing/Servicing";
import HistoryService from "../pages/servicing/servicingHistory/HistoryService";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ProtectedRoute from "../middleware/ProtectedRoute";
import PublicRoute from "../middleware/PublicRoute";
import UpdateProfile from "../pages/auth/UpdateProfile";
import ChangePassword from "../pages/auth/ChangePassword";
import DetailService from "../pages/servicing/serviceInformation/DetailService";
import PromotionData from "../pages/promotion/PromotionData";
import DetailPromotion from "../pages/promotion/DetailPromotion";
import Gift from "../pages/gift/Gift";
import GiftData from "../pages/gift/giftData/GiftData";
import GiftHistoryList from "../pages/gift/giftHistory/GiftHistoryList";
import Time_Zone from "../pages/time_zone/Time_Zone";
import TimeData from "../pages/time_zone/time/Time";
import ZoneData from "../pages/time_zone/zone/Zone";
import User from "../pages/user/User";
// import User from "../pages/user/User";



const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute><Login /></PublicRoute>,
  },
  {
    path: "/login",
    element: <PublicRoute><Login /></PublicRoute>,
  },
  {
    path: "/register",
    element: <PublicRoute><Register /></PublicRoute>
  },
  {
    path: "/forgot-password",
    element: <PublicRoute><ForgotPassword /></PublicRoute>,
  },
  {
    path: "/user",
    element: <ProtectedRoute> <Layout /> </ProtectedRoute>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "appointment",
        element: <Appointment />,
        children: [
          {
            index: true,
            element: <Approve />
          },
          {
            path: "repair",
            element: <Repair />
          },
          {
            path: "cancel",
            element: <Cancel />
          },
          {
            path: "success",
            element: <Success />
          },
        ],

      },
      {
        path: "receiverCarDetail/:id",
        element: <ReceiverCarDetail />
      },
      {
        path: "repairDetail/:id",
        element: <RepairDetails />
      },
      {
        path: "repairSuccess",
        element: <RepairSuccess />
      },
      {
        path: "successDetail/:id",
        element: <SuccessDetail />
      },
      {
        path: "vehicle",
        element: <Vehicle />
      },
      {
        path: "gift",
        element: <Gift />,
        children: [
          {
            index: true,
            element: <GiftData />,
          },
          {
            path: "gift-history",
            element: <GiftHistoryList />
          },
        ]
      },
      {
        path: "servicing",
        element: <Servicing />,
        children: [
          {
            index: true,
            element: <ServiceInformation />
          },
          {
            path: "service-history",
            element: <HistoryService />
          },
        ]
      },
      {
        path: "time-zone",
        element: <Time_Zone />,
        children: [
          {
            index: true,
            element: <TimeData/>
          },
          {
            path: "zone",
            element: <ZoneData />
          }
        ]
      },
      {
        path: "user",
        element: <User/>
      },
      {
        path: "promotion",
        element: <PromotionData />,
      },
      {
        path: "profile",
        element: <UpdateProfile />
      },
      {
        path: "change-password",
        element: <ChangePassword />
      },
      {
        path: "service-detail/:id",
        element: <DetailService />
      },
      {
        path: "promotion-detail/:id",
        element: <DetailPromotion />
      }


    ],
  },
]);





const Router = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default Router;
