import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SwapFood from "../pages/SwapFood";
import InsertFood from "../pages/InsertFood";


const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/insertFood" element={<InsertFood />} />
        <Route path="/swapFood" element={<SwapFood />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  };
  
  export default AppRoutes;