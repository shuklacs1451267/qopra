import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
  role: "admin" | "client";
}

export default function ProtectedRoute({ children, role }: Props) {
  const { token, userRole } = useContext(AuthContext);

  if (!token) return <Navigate to="/login" replace />;
  if (userRole !== role) return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
}
