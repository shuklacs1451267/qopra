import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/userCss/profile/CampaignPage.css";
import api from "../../../api/adminApi";

interface Campaign {
  _id: string;
  title: string;
  description: string;
  channel: string;
  type: string;
  status: "draft" | "scheduled" | "running" | "completed" | "failed";
  scheduledAt: string;
  sentMessages: number;
  deliveredMessages: number;
  failedMessages: number;
  recipients: string[];
  tags: string[];
  cost: number;
}

const CampaignPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const called = useRef(false);
  const navigate = useNavigate();

  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/campaigns/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const filtered = res.data.data.filter(
        (c: Campaign) => c.recipients.length > 0 || c.sentMessages > 0
      );

      setCampaigns(filtered);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load campaigns");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!called.current) {
      fetchCampaigns();
      called.current = true;
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "#facc15"; // yellow
      case "completed":
        return "#22c55e"; // green
      case "failed":
        return "#ef4444"; // red
      case "draft":
        return "#6b7280"; // gray
      default:
        return "#6b7280";
    }
  };

  if (loading) return <div className="campaign-page">Loading campaigns...</div>;
  if (error) return <div className="campaign-page">{error}</div>;
  if (campaigns.length === 0) return <div className="campaign-page">No campaigns found.</div>;

  return (
    <div className="campaign-page">
      <h2>Your Campaigns</h2>
      <div className="table-wrapper">
        <table className="campaign-table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Channel</th>
              <th>Type</th>
              <th>Status</th>
              <th>Scheduled At</th>
              <th>Sent / Delivered / Failed</th>
              <th>Recipients</th>
              <th>Tags</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c._id}>
                <td>{c.title}</td>
                <td>{c.channel}</td>
                <td>{c.type}</td>
                <td style={{ color: getStatusColor(c.status), fontWeight: "bold" }}>{c.status}</td>
                <td>{new Date(c.scheduledAt).toLocaleString()}</td>
                <td>{`${c.sentMessages} / ${c.deliveredMessages} / ${c.failedMessages}`}</td>
                <td>{c.recipients.length}</td>
                <td>{c.tags.join(", ") || "-"}</td>
                <td>₹{c.cost}</td>
                <td className="actions-cell">
                  <button
                    className="btn view"
                    onClick={() => navigate(`/logs/campaign/${c._id}`)}
                  >
                    View
                  </button>
                  <button className="btn edit">Edit</button>
                  <button className="btn delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignPage;
