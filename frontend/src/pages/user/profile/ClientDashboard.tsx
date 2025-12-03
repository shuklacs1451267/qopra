import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import api from "../../../api/adminApi";
import "../../../styles/userCss/ClientDashboard.css";

interface WeeklyActivity {
  name: string;
  sent: number;
  delivered: number;
}

interface WeeklyCost {
  name: string;
  cost: number;
}

interface PieItem {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface CampaignItem {
  title: string;
  sent: number;
  delivered: number;
  status: string;
}

const PIE_COLORS = ["#00e5ff", "#ffb300", "#9b8cff"];

export default function ClientDashboard() {
  const navigate = useNavigate();
  const [usersSeries, setUsersSeries] = useState<WeeklyActivity[]>([]);
  const [revenueSeries, setRevenueSeries] = useState<WeeklyCost[]>([]);
  const [pieData, setPieData] = useState<PieItem[]>([]);
  const [stats, setStats] = useState({
    credits: 0,
    creditsValue: 0,
    campaignsRunning: 0,
    messagesSent: 0,
    deliveryRate: "0%",
  });
  const [recentCampaigns, setRecentCampaigns] = useState<CampaignItem[]>([]);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await api.get("/users/dashboard");
        const data = res.data.data;

        setUsersSeries(Array.isArray(data.weeklyActivity) ? data.weeklyActivity : []);
        setRevenueSeries(Array.isArray(data.weeklyCost) ? data.weeklyCost : []);
        setPieData(Array.isArray(data.channelSplit) ? data.channelSplit : []);

        setStats({
          credits: data.credits || 100,
          creditsValue: data.creditsValue || 1000,
          campaignsRunning: data.campaignsRunning || 1,
          messagesSent: data.messagesSent || 50,
          deliveryRate: data.deliveryRate || "95%",
        });

        setRecentCampaigns(
          Array.isArray(data.recentCampaigns) && data.recentCampaigns.length > 0
            ? data.recentCampaigns
            : [
                { title: "Diwali Promo", sent: 12000, delivered: 11640, status: "Delivered" },
                { title: "OTP: Login", sent: 4200, delivered: 4180, status: "Partial" },
                { title: "Monthly Newsletter", sent: 1800, delivered: 468, status: "Email" },
              ]
        );
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    }

    fetchDashboard();
  }, []);

  const monthlyCost = useMemo(
    () => (revenueSeries ?? []).reduce((a, b) => a + (b?.cost || 0), 0),
    [revenueSeries]
  );

  const projectedNextMonth = useMemo(() => Math.floor(monthlyCost * 1.18), [monthlyCost]);

  return (
    <div className="client-wrap">

      {/* Header with buttons */}
      <header className="client-header">
        <div>
          <h1 className="client-title">Dashboard</h1>
          <p className="client-sub">Overview · Credits · Campaigns</p>
        </div>
        <div className="client-actions">
          <button className="btn ghost">Buy Credits</button>
          <button
            className="btn primary"
            onClick={() => navigate("/create-campaigns")}
          >
            Create Campaign
          </button>
        </div>
      </header>

      <section className="client-stats">
        <motion.div className="card glass" whileHover={{ y: -6 }}>
          <div className="card-top">Credits</div>
          <div className="card-value">{stats.credits.toLocaleString()}</div>
          <div className="card-sub">≈ ₹{stats.creditsValue.toLocaleString()}</div>
        </motion.div>

        <motion.div className="card glass" whileHover={{ y: -6 }}>
          <div className="card-top">Active Campaigns</div>
          <div className="card-value">{stats.campaignsRunning}</div>
        </motion.div>

        <motion.div className="card glass" whileHover={{ y: -6 }}>
          <div className="card-top">Messages Sent</div>
          <div className="card-value">{stats.messagesSent.toLocaleString()}</div>
        </motion.div>

        <motion.div className="card glass" whileHover={{ y: -6 }}>
          <div className="card-top">Delivery Rate</div>
          <div className="card-value">{stats.deliveryRate}</div>
        </motion.div>
      </section>

      <section className="client-grid">

        <div className="left-col">
          <div className="panel glass">
            <h3 className="panel-title">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={usersSeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sent" stroke="#00e5ff" strokeWidth={2} />
                <Line type="monotone" dataKey="delivered" stroke="#7af2b2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="panel glass">
            <h3 className="panel-title">Recent Campaigns</h3>
            <div className="campaign-list">
              {recentCampaigns.map((c, idx) => (
                <div className="campaign-row" key={idx}>
                  <div className="c-title">{c.title}</div>
                  <div className="c-meta">
                    Sent {c.sent.toLocaleString()} • Delivered {c.delivered.toLocaleString()}
                  </div>
                  <div className={`c-badge ${c.status.toLowerCase()}`}>{c.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="right-col">
          <div className="panel glass">
            <h3 className="panel-title">Channel Split</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="legend">
              {pieData.map((p, i) => (
                <div key={p.name} className="legend-row">
                  <span className="legend-swatch" style={{ background: PIE_COLORS[i] }} />
                  <span>{p.name}</span>
                  <span className="legend-value">{p.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel glass">
            <h3 className="panel-title">Cost Overview</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={revenueSeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cost" fill="#ffb300" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="cost-summary">
              <div>Monthly cost: <strong>₹{monthlyCost}</strong></div>
              <div>Projected next month: <strong>₹{projectedNextMonth}</strong></div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
