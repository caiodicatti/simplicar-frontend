import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedLayout from "./layouts/ProtectedLayout/ProtectedLayout";
import VehicleSearchPage from "./pages/VehicleSearchPage/VehicleSearchPage";
import VehiclePage from "./pages/VehiclePage/VehiclePage";
import FinancialReport from "./pages/FinancialReport/FinancialReport";
import InventoryReport from "./pages/InventoryReport/InventoryReport";
import VehicleExpenseReport from "./pages/VehicleExpenseReport/VehicleExpenseReport";
import PeriodExpenseReport from "./pages/PeriodExpenseReport/PeriodExpenseReport";

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

      <Route
        path="/cad-carro"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <VehiclePage vehicleType="Carro" mode="create" />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/cad-moto"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <VehiclePage vehicleType="Moto" mode="create" />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-carro/:id"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <VehiclePage vehicleType="Carro" mode="edit" />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-moto/:id"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <VehiclePage vehicleType="Moto" mode="edit" />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/relatorio-financeiro"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <FinancialReport />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/relatorio-despesa-veiculo"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <VehicleExpenseReport />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/relatorio-despesa-periodo"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <PeriodExpenseReport />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/relatorio-inventario"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <InventoryReport />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

    </Routes>

  );
}
