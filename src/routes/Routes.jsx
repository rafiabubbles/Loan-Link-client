import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import ErrorPage from "../pages/ErrorPage";

// Pages
import Home from "../pages/Home";
import AllLoans from "../pages/AllLoans";
import LoanDetails from "../pages/LoanDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Borrower
import MyLoans from "../components/dashboard/Borrower/MyLoans";
import MyProfile from "../components/dashboard/Borrower/MyProfile";
import LoanApplicationForm from "../components/dashboard/Borrower/LoanApplication";

// Manager
import AddLoan from "../components/dashboard/Manager/AddLoan";
import ManageLoans from "../components/dashboard/Manager/ManageLoans";
import PendingLoans from "../components/dashboard/Manager/PendingLoans";
import ApprovedLoans from "../components/dashboard/Manager/ApprovedLoans";

// Admin
import AdminAllLoans from "../components/dashboard/Admin/AdminAllLoans";
import ManageUsers from "../components/dashboard/Admin/ManageUsers";

// Routes protection
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            // Public Routes
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/all-loans",
                element: <AllLoans />,
            },
            {
                path: "/loan/:id",
                element: (
                    <PrivateRoute>
                        <LoanDetails />
                    </PrivateRoute>
                ),
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },

            // Borrower Routes
            {
                path: "/dashboard/my-loans",
                element: (
                    <PrivateRoute>
                        <MyLoans />
                    </PrivateRoute>
                ),
            },
            {
                path: "/dashboard/my-profile",
                element: (
                    <PrivateRoute>
                        <MyProfile />
                    </PrivateRoute>
                ),
            },
            {
                path: "/loan-application",
                element: (
                    <PrivateRoute>
                        < LoanApplicationForm />
                    </PrivateRoute>
                ),
            },

            // Manager Routes
            {
                path: "/dashboard/add-loan",
                element: (
                    <ManagerRoute>
                        <AddLoan />
                    </ManagerRoute>
                ),
            },
            {
                path: "/dashboard/manage-loans",
                element: (
                    <ManagerRoute>
                        <ManageLoans />
                    </ManagerRoute>
                ),
            },
            {
                path: "/dashboard/pending-loans",
                element: (
                    <ManagerRoute>
                        <PendingLoans />
                    </ManagerRoute>
                ),
            },
            {
                path: "/dashboard/approved-loans",
                element: (
                    <ManagerRoute>
                        <ApprovedLoans />
                    </ManagerRoute>
                ),
            },

            // Admin Routes
            {
                path: "/dashboard/admin/all-loans",
                element: (
                    <AdminRoute>
                        <AdminAllLoans />
                    </AdminRoute>
                ),
            },

            {
                path: "/dashboard/admin/manage-users",
                element: (
                    <AdminRoute>
                        <ManageUsers />
                    </AdminRoute>
                ),
            },
        ],
    },
]);
