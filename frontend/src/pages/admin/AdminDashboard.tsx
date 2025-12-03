import {type JSX } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import "../../styles/adminCss/Dashboard.css";

const usersSeries = [
  { name: "Jan", users: 420, revenue: 3200 },
  { name: "Feb", users: 520, revenue: 4100 },
  { name: "Mar", users: 610, revenue: 5200 },
  { name: "Apr", users: 710, revenue: 6200 },
  { name: "May", users: 880, revenue: 7400 },
  { name: "Jun", users: 970, revenue: 9000 },
];
export default function AdminDashboard(): JSX.Element {
  // TODO: replace hard-coded values with backend data
  const stats = {
    totalClients: 324,
    whatsappSentToday: 12430,
    monthlyRevenue: 45230,
    pendingTemplates: 7,
  };

  return (
    <div className="adm-wrap">
      <header className="adm-header">
        <div>
          <h1 className="adm-title">Admin Dashboard</h1>
          <p className="adm-sub">Overview · Realtime metrics · System health</p>
        </div>

        <div className="adm-actions">
          <button className="adm-btn">Create Client</button>
          <button className="adm-btn ghost">Add Credits</button>
        </div>
      </header>

      <section className="adm-stats">
        <div className="stat-card glass">
          <div className="stat-top">Total Clients</div>
          <div className="stat-value">{stats.totalClients}</div>
          <div className="stat-mini">Active / 290</div>
        </div>

        <div className="stat-card glass">
          <div className="stat-top">WhatsApp Sent (Today)</div>
          <div className="stat-value">{stats.whatsappSentToday.toLocaleString()}</div>
          <div className="stat-mini">Delivered 97%</div>
        </div>

        <div className="stat-card glass">
          <div className="stat-top">Monthly Revenue</div>
          <div className="stat-value">₹{stats.monthlyRevenue.toLocaleString()}</div>
          <div className="stat-mini">Billing cycle: Monthly</div>
        </div>

        <div className="stat-card glass">
          <div className="stat-top">Templates Pending</div>
          <div className="stat-value">{stats.pendingTemplates}</div>
          <div className="stat-mini">Needs review</div>
        </div>
      </section>

      <section className="adm-charts">
        <div className="chart-card glass">
          <h3 className="chart-title">User Growth</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={usersSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip wrapperStyle={{ background: "#0f1724", borderRadius: 8 }} />
              <Line type="monotone" dataKey="users" stroke="#00e5ff" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card glass">
          <h3 className="chart-title">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={usersSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip wrapperStyle={{ background: "#0f1724", borderRadius: 8 }} />
              <Legend wrapperStyle={{ color: "#fff" }} />
              <Bar dataKey="revenue" fill="#ffb300" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="adm-recent glass">
        <h3>Recent Campaigns</h3>
        <div className="campaign-list">
          <div className="campaign-row">
            <div className="campaign-title">Promo: Diwali Offer</div>
            <div className="campaign-meta">Sent: 12,000 • Delivered: 11,640</div>
            <div className="campaign-status delivered">Delivered</div>
          </div>

          <div className="campaign-row">
            <div className="campaign-title">OTP: Login Pass</div>
            <div className="campaign-meta">Sent: 4,200 • Delivered: 4,180</div>
            <div className="campaign-status partial">Partial</div>
          </div>

          <div className="campaign-row">
            <div className="campaign-title">Template Approval Request</div>
            <div className="campaign-meta">Submitted by: alice@example.com</div>
            <div className="campaign-status pending">Pending</div>
          </div>
        </div>
      </section>
    </div>
  );
}
