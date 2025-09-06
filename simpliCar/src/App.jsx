import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedLayout from "./layouts/ProtectedLayout/ProtectedLayout";
import VehicleSearchPage from "./pages/VehicleSearchPage/VehicleSearchPage";

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
              <VehicleSearchPage vehicleType="Carro" />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/motos"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <VehicleSearchPage vehicleType="Moto" />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
