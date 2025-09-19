import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedLayout from "./layouts/ProtectedLayout/ProtectedLayout";
import RequirePermission from "./components/auth/ProtectedRoute";
import VehicleSearchPage from "./pages/VehicleSearchPage/VehicleSearchPage";
import VehiclePage from "./pages/VehiclePage/VehiclePage";
import FinancialReport from "./pages/FinancialReport/FinancialReport";
import InventoryReport from "./pages/InventoryReport/InventoryReport";
import VehicleExpenseReport from "./pages/VehicleExpenseReport/VehicleExpenseReport";
import PeriodExpenseReport from "./pages/PeriodExpenseReport/PeriodExpenseReport";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import UsersPage from "./pages/UsersPage/UsersPage";
import PreferencesPage from "./pages/UserPreferencesPage/UserPreferencesPage";
import PasswordChangePage from "./pages/PasswordChangePage/PasswordChangePage";
import StoresPage from "./pages/StoresPage/StoresPage";
import NoAccess from "./pages/NoAccess/NoAccess";
import { canSeeStores, canAdminUsers, canManageUsers } from "./utils/permissions";
import { useAuth } from './context/AuthContext';

export default function App() {

  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/no-access"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <NoAccess />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

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
            <RequirePermission user={user} permissionFn={canManageUsers}>
              <ProtectedLayout>
                <FinancialReport />
              </ProtectedLayout>
            </RequirePermission>
          </ProtectedRoute>
        }
      />

      <Route
        path="/relatorio-despesa-veiculo"
        element={
          <ProtectedRoute>
            <RequirePermission user={user} permissionFn={canManageUsers}>
              <ProtectedLayout>
                <VehicleExpenseReport />
              </ProtectedLayout>
            </RequirePermission>
          </ProtectedRoute>
        }
      />

      <Route
        path="/relatorio-despesa-periodo"
        element={
          <ProtectedRoute>
            <RequirePermission user={user} permissionFn={canManageUsers}>
              <ProtectedLayout>
                <PeriodExpenseReport />
              </ProtectedLayout>
            </RequirePermission>
          </ProtectedRoute>
        }
      />

      <Route
        path="/relatorio-inventario"
        element={
          <ProtectedRoute>
            <RequirePermission user={user} permissionFn={canManageUsers}>
              <ProtectedLayout>
                <InventoryReport />
              </ProtectedLayout>
            </RequirePermission>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configuracoes/perfil"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <ProfilePage />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configuracoes/usuarios"
        element={
          <ProtectedRoute>
            <RequirePermission user={user} permissionFn={canAdminUsers}>
              <ProtectedLayout>
                <UsersPage />
              </ProtectedLayout>
            </RequirePermission>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configuracoes/lojas"
        element={
          <ProtectedRoute>
            <RequirePermission user={user} permissionFn={canSeeStores}>
              <ProtectedLayout>
                <StoresPage />
              </ProtectedLayout>
            </RequirePermission>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configuracoes/preferencias"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <PreferencesPage />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configuracoes/senha"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <PasswordChangePage />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}
