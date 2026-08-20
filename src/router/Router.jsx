import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AllHome from "../pages/Home/AllHome";

// Security and Authentication Guards
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login/Login";

// Dashboard Imports
import DashboardLayout from "../pages/Dashboard/DashboardLayout/DashboardLayout";
import DashboardHome from "../pages/Dashboard/pages/DashboardHome/DashboardHome";
import Categories from "../pages/Dashboard/pages/Categories/Categories";
import Projects from "../pages/Dashboard/pages/Projects/Projects";
import Messages from "../pages/Dashboard/pages/Messages/Messages";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <AllHome />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute allowedRoles={["user"]} />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        element: <DashboardHome />,
                    },
                    {
                        path: "categories",
                        element: <Categories />,
                    },
                    {
                        path: "projects",
                        element: <Projects />,
                    },
                    {
                        path: "messages",
                        element: <Messages />,
                    },
                ],
            },
        ],
    },
]);