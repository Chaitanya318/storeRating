import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AdminDashboard from "./pages/admin/Dashboard";
import UserStores from "./pages/user/Stores";
import OwnerDashboard from "./pages/owner/Dashboard";
import Users from "./pages/admin/Users";
import Stores from "./pages/admin/Stores";
import ChangePassword from "./pages/user/ChangePassword";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />

        <Route path="/admin/stores" element={<Stores />} />
      </Route>

      {/* User Routes */}
      <Route element={<ProtectedRoute roles={["USER"]} />}>
        <Route path="/user/stores" element={<UserStores />} />
        <Route
    path="/user/password"
    element={<ChangePassword />}
/>
      </Route>

      {/* Owner Routes */}
      <Route element={<ProtectedRoute roles={["OWNER"]} />}>
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route
    path="/owner/password"
    element={<ChangePassword />}
/>
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
