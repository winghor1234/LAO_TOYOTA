
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import Cancel from "../pages/Booking/Cancel/Cancel";
import Success from "../pages/Booking/success/Success";
import ReceiverCarDetail from "../pages/Booking/approve/ReceiverCarDetail";
import SuccessDetail from "../pages/Booking/success/SuccessDetail";
import Dashboard from "../pages/dashboard/Dashboard";
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
import DetailPromotion from "../pages/promotion/DetailPromotion";
import Gift from "../pages/gift/Gift";
import GiftHistoryList from "../pages/gift/giftHistory/GiftHistoryList";
import Time_Zone from "../pages/time_zone/Time_Zone";
import TimeDetail from "../pages/time_zone/time/TimeDetail";
import ZoneDetail from "../pages/time_zone/zone/ZoneDetail";
import CarList from "../pages/Car/CarList";
import Booking from "../pages/Booking/Booking";
import Approve from "../pages/Booking/approve/Approve";
import PromotionList from "../pages/promotion/PromotionList";
import GiftList from "../pages/gift/giftData/GiftList";
import ServiceList from "../pages/servicing/serviceInformation/ServiceList";
import TimeList from "../pages/time_zone/time/TimeList";
import ZoneList from "../pages/time_zone/zone/ZoneList";
import ReportList from "../pages/report/ReportList";
import FixList from "../pages/Booking/fix/FixList";
import FixDetails from "../pages/Booking/fix/FixDetails";
import BookingSuccess from "../pages/Booking/approve/BookingSuccess";
import Auth from "../pages/auth/Auth";
import BillDetail from "../pages/Booking/fix/BillDetail";
import AdminList from "../pages/admin/AdminList";
import UserList from "../pages/user/UserList";



const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute><Auth /></PublicRoute>,
    children: [
      {
        index: true,
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
    ]
  },

  {
    path: "/user",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "booking",
        element: <Booking />,
        children: [
          {
            index: true,
            element: <Approve />
          },
          {
            path: "fix",
            element: <FixList />
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
        path: "fixDetail/:id",
        element: <FixDetails />
      },
      {
        path: "bookingSuccess/:id",
        element: <BookingSuccess />
      },
      {
        path: "successDetail/:id",
        element: <SuccessDetail />
      },
      {
        path: "billDetail/:id",
        element: <BillDetail/>
      },
      {
        path: "car",
        element: <CarList />
      },
      {
        path: "gift",
        element: <Gift />,
        children: [
          {
            index: true,
            element: <GiftList />,
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
            element: <ServiceList />
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
            element: <TimeList />
          },
          {
            path: "zone",
            element: <ZoneList />
          }
        ]
      },
      {
        path: "user",
        element: <UserList/>
      },
      {
        path: "admin",
        element: <AdminList/>
      },
      {
        path: "promotion",
        element: <PromotionList />,
      },
      {
        path: "report",
        element: <ReportList />
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
        path: "promotionDetail/:id",
        element: <DetailPromotion />
      },
      {
        path: 'timeDetail/:id',
        element: <TimeDetail />
      },
      {
        path: 'zoneDetail/:id',
        element: <ZoneDetail />
      },


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


