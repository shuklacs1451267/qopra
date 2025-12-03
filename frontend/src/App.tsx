import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/main/Login";
import Register from "./pages/main/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ClientDashboard from "./pages/user/profile/ClientDashboard";
import Unauthorized from "./pages/main/Unauthorized";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/main/Home";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ClientLayout from "./pages/user/Layout";
import CreateCampaign from "./pages/user/campaigns/CreateCampaign";
import ClientProfile from "./pages/user/profile/ClientProfile";
import CampaignPage from "./pages/user/campaigns/CampaignPage";
import CampaignLogsPage from "./pages/user/campaigns/CampaignLogsPage";
export default function App() {
  const { userName, userImage } = useContext(AuthContext);

  return (
    <Routes>

      <Route path="/" element={<Layout><Home /></Layout>} />

      <Route path="/register" element={<Layout><Register /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <Layout>
              <AdminDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="client">
            <ClientLayout userName={userName || ""} userImage={userImage || ""}>
              <ClientDashboard />
            </ClientLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-campaigns"
        element={
          <ProtectedRoute role="client">
            <ClientLayout userName={userName || ""} userImage={userImage || ""}>
              <CreateCampaign />
            </ClientLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/campaigns"
        element={
          <ProtectedRoute role="client">
            <ClientLayout userName={userName || ""} userImage={userImage || ""}>
              <CampaignPage />
            </ClientLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/logs/campaign/:id"
        element={
          <ProtectedRoute role="client">
            <ClientLayout userName={userName || ""} userImage={userImage || ""}>
              <CampaignLogsPage />
            </ClientLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute role="client">
            <ClientLayout userName={userName || ""} userImage={userImage || ""}>
              <ClientProfile />
            </ClientLayout>
          </ProtectedRoute>
        }
      />


      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}
