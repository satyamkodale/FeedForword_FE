import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      {/* <Route
        path="/user-dashboard"
        element={
          <PrivateRoute role="USER">
            <UserDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute role="ADMIN">
            <AdminDashboard />
          </PrivateRoute>
        }
      /> */}
    </Routes>
  );
}

export default App;
