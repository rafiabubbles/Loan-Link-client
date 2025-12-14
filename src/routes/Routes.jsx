import { createBrowserRouter } from "react-router-dom";

// Layouts and Base Pages
import Root from "../pages/Root";
import ErrorPage from "../pages/ErrorPage";

// Public Pages
import Home from "../pages/Home";
import AllLoans from "../pages/AllLoans";
import LoanDetails from "../pages/LoanDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Dashboard Layout (ধরে নিলাম এটি বিভিন্ন রোলের জন্য ড্যাশবোর্ড কাঠামো দেয়)
import DashboardLayout from "../components/dashboard/BorrowerDashboardLayout";

// Borrower Components
import MyLoans from "../components/dashboard/Borrower/MyLoans";
import MyProfile from "../components/dashboard/Borrower/MyProfile";
import LoanApplicationForm from "../components/dashboard/Borrower/LoanApplication";

// Manager Components
import AddLoan from "../components/dashboard/Manager/AddLoan";
import ManageLoans from "../components/dashboard/Manager/ManageLoans";
import PendingLoans from "../components/dashboard/Manager/PendingLoans";
import ApprovedLoans from "../components/dashboard/Manager/ApprovedLoans";

// Admin Components
import AdminAllLoans from "../components/dashboard/Admin/AdminAllLoans";
import ManageUsers from "../components/dashboard/Admin/ManageUsers";

// Routes protection (এগুলি Outlet রেন্ডার করবে)
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            // --- 1. Public Routes ---
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/all-loans",
                element: <AllLoans />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },

            // --- 2. Private Routes (Generic Auth Required) ---
            {
                // PrivateRoute রুট লেভেলে ব্যবহৃত হবে এবং চাইল্ড রুটগুলোকে সুরক্ষিত করবে
                element: <PrivateRoute />,
                children: [
                    {
                        path: "/loan/:id",
                        element: <LoanDetails />, // 💡 Login Required
                    },
                    {
                        path: "/loan-application",
                        element: <LoanApplicationForm />, // 💡 Login Required
                    },
                ],
            },

            // --- 3. Nested Dashboard Routes (Role-Based Access Control) ---
            {
                path: "/dashboard",
                element: <DashboardLayout />, // ড্যাশবোর্ডের সমস্ত রুট এই লেআউটের মধ্যে থাকবে
                children: [

                    // 3.1. Borrower Routes (Protected by PrivateRoute with allowedRoles=['borrower'])
                    {
                        element: <PrivateRoute allowedRoles={['borrower']} />,
                        children: [
                            {
                                index: true, // /dashboard/ এ গেলে এটি দেখাবে
                                element: <MyLoans />,
                            },
                            {
                                path: "my-loans",
                                element: <MyLoans />,
                            },
                            {
                                path: "profile",
                                element: <MyProfile />,
                            },
                        ],
                    },

                    // 3.2. Manager Routes (Protected by ManagerRoute)
                    {
                        element: <ManagerRoute />, // ManagerRoute অবশ্যই Outlet রেন্ডার করবে এবং রোল চেক করবে
                        children: [
                            {
                                path: "add-loan",
                                element: <AddLoan />,
                            },
                            {
                                path: "manage-loans",
                                element: <ManageLoans />,
                            },
                            {
                                path: "pending-loans",
                                element: <PendingLoans />,
                            },
                            {
                                path: "approved-loans",
                                element: <ApprovedLoans />,
                            },
                        ],
                    },

                    // 3.3. Admin Routes (Protected by AdminRoute)
                    {
                        element: <AdminRoute />, // AdminRoute অবশ্যই Outlet রেন্ডার করবে এবং রোল চেক করবে
                        children: [
                            {
                                path: "admin/all-loans",
                                element: <AdminAllLoans />,
                            },
                            {
                                path: "admin/manage-users",
                                element: <ManageUsers />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);