import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Home/Login";
import Register from "../Pages/Home/Register";
import Loans from "../Pages/Home/Loans";
import About from "../Pages/Home/About";
import Contacts from "../Pages/Home/Contacts";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManageUser from "../Pages/Dashboard/Admin/ManageUser";
import Error from "../Pages/Error/Error";
import GuestRoute from "./Private/GuestRoute";
import PrivateRoute from "./Private/PrivateRoute";
import Profile from "../Pages/Common/Profile";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AllLoans from "../Pages/Dashboard/Admin/AllLoans";
import MyLoan from "../Pages/Dashboard/Users/MyLoan";
import LoanApplication from "../Pages/Dashboard/Admin/LoanApplication";
import AddLoan from "../Pages/Dashboard/Manager/AddLoan";
import ApprovedLoan from "../Pages/Dashboard/Manager/ApprovedLoan";
import PendingLoan from "../Pages/Dashboard/Manager/PendingLoan";
import ManageLoan from "../Pages/Dashboard/Manager/ManageLoan";
import LoanDetails from "../Pages/Home/LoanDetails";
import LoanForm from "../Pages/Home/LoanApplicationForm";
import PaymentSuccess from "../Pages/Dashboard/PaymentSuccess";
import PaymentFailed from "../Pages/Dashboard/PaymentFailed";
import EditLoan from "../Pages/Dashboard/Admin/EditLoan";
import UpdateUser from "../Pages/Dashboard/Admin/UpdateUser";
import AdminRoute from "./Private/AdminRoute";
import ManagerRoute from "./Private/ManagerRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/all-loans",
        element: <Loans></Loans>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contacts></Contacts>,
      },
      {
        path: "/loan-details/:id",
        element: (
          <PrivateRoute>
            <LoanDetails></LoanDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/loan-form",
        element: (
          <PrivateRoute>
            <LoanForm></LoanForm>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <GuestRoute>
            <Login></Login>,
          </GuestRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <GuestRoute>
            <Register></Register>,
          </GuestRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>,
      },
      // admin
      {
        path: "/dashboard/manage-user",
        element: (
          <AdminRoute>
            <ManageUser></ManageUser>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-loans",
        element: (
          <AdminRoute>
            <AllLoans></AllLoans>
          </AdminRoute>
        ),
      },

      {
        path: "/dashboard/loan-application",
        element: (
          <AdminRoute>
            <LoanApplication></LoanApplication>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/edit-loan/:id",
        element: (
          <AdminRoute>
            <EditLoan></EditLoan>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/update-user/:id",
        element: (
          <AdminRoute>
            <UpdateUser></UpdateUser>
          </AdminRoute>
        ),
      },
      // Manager
      {
        path: "/dashboard/add-loan",
        element: (
          <ManagerRoute>
            <AddLoan></AddLoan>
          </ManagerRoute>
        ),
      },
      {
        path: "/dashboard/approved-loan",
        element: (
          <ManagerRoute>
            <ApprovedLoan></ApprovedLoan>
          </ManagerRoute>
        ),
      },
      {
        path: "/dashboard/pending-loan",
        element: (
          <ManagerRoute>
            <PendingLoan></PendingLoan>
          </ManagerRoute>
        ),
      },
      {
        path: "/dashboard/manage-loan",
        element: (
          <ManagerRoute>
            <ManageLoan></ManageLoan>
          </ManagerRoute>
        ),
      },
      // User
      {
        path: "/dashboard/my-loan",
        element: <MyLoan></MyLoan>,
      },
      // Payment
      {
        path: "/dashboard/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/dashboard/payment-failed",
        element: <PaymentFailed></PaymentFailed>,
      },
    ],
  },
]);

export default router;
