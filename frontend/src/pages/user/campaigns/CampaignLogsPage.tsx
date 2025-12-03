import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../../../styles/userCss/profile/CampaignLogsPage.css";

interface Log {
  _id: string;
  recipient: string;
  channel: string;
  attempt: number;
  success: boolean;
  error: string;
  providerResponse: {
    status: string;
    sid: string;
  } | null;
  cost: number;
  createdAt: string;
}

const CampaignLogs: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/logs/campaign/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLogs(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load campaign logs");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [id]);

  const getStatusClass = (success: boolean) => success ? "status-success" : "status-failed";

  if (loading) return <div className="logs-page">Loading logs...</div>;
  if (error) return <div className="logs-page">{error}</div>;
  if (logs.length === 0) return <div className="logs-page">No logs found.</div>;

  return (
    <div className="logs-page">
      <h2>Campaign Logs</h2>
      <div className="table-wrapper">
        <table className="logs-table">
          <thead>
            <tr>
              <th>Recipient</th>
              <th>Channel</th>
              <th>Attempt</th>
              <th>Status</th>
              <th>Error</th>
              <th>Cost</th>
              <th>SID</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td>{log.recipient}</td>
                <td>{log.channel}</td>
                <td>{log.attempt}</td>
                <td className={getStatusClass(log.success)}>
                  {log.success ? "Success" : "Failed"}
                </td>
                <td>{log.error || "-"}</td>
                <td>₹{log.cost}</td>
                <td>{log.providerResponse?.sid || "-"}</td>
                <td>{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/campaigns" className="back-link">← Back to Campaigns</Link>
    </div>
  );
};

export default CampaignLogs;
