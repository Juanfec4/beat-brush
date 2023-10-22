import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";

import SpotifyLogin from "./components/ui/buttons/spotifyLogin";
import AuthPage from "./pages/auth";
import OverviewPage from "./pages/overview";

import "./assets/styles/global.scss";
import useStore from "./zustand/store";
import Navbar from "./components/layout/navbar";
import ReceiptsPage from "./pages/receipts";
import ProtectedRoute from "./components/layout/protectedRoute";
import LoginPage from "./pages/login";
import ErrorPage from "./pages/error";
const AppLayout = () => {
  const state = useStore();
  useEffect(() => {
    if (state.error) {
      state.setAuthenticated(false);
    }
  }, [state.error]);
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/overview",
        element: <ProtectedRoute children={<OverviewPage />} />,
      },
      {
        path: "/receipts",
        element: <ProtectedRoute children={<ReceiptsPage />} />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
