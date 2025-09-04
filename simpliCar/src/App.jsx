import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedLayout from "./layouts/ProtectedLayout";

import SidebarMenu from "./components/SidebarMenu/SidebarMenu";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <HomePage />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/carros"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <div>Carros Page</div>
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/motos"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <div>Motos Page</div>
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
