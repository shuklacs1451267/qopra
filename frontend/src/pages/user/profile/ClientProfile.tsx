import React, { useEffect, useState, useRef } from "react";
import "../../../styles/userCss/profile/ClientProfile.css";
import api from "../../../api/adminApi";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaCreditCard,
  FaFileAlt,
  FaFileImage,
  FaMobileAlt
} from "react-icons/fa";

interface FileData {
  name: string;
  type: string;
  uploadedOn: string;
}

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  role: string;
  companyName: string;
  website: string;
  avatar: string;
  status: string;
  isVerified: boolean;
  totalCampaigns: number;
  activeCampaigns: number;
  completedCampaigns: number;
  totalSpent: number;
  successRate: number;
  credits: number;
  plan: string;
  twilioNumber: string;
  twilioVerified: boolean;
  files: FileData[];
}

const ClientProfile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const called = useRef(false);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to load profile");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!called.current) {
      fetchProfile();
      called.current = true;
    }
  }, []);

  // Send OTP function
  const sendOtp = async () => {
    if (!profile) return;
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/users/twilio/send-code",
        { twilioNumber: profile.twilioNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) setOtpSent(true);
    } catch (err) {
      console.log(err);
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      setVerifying(true);
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/users/twilio/verify-code",
        { otp },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("Number Verified Successfully!");
        setShowPopup(false);
        fetchProfile();
      }
    } catch (err) {
      console.log(err);
      alert("Invalid OTP, try again!");
    } finally {
      setVerifying(false);
    }
  };

  if (loading) return <div className="profile-page-modern">Loading...</div>;
  if (error) return <div className="profile-page-modern">{error}</div>;
  if (!profile) return null;

  const campaignMetrics = [
    { label: "Total Campaigns", value: profile.totalCampaigns, color: "#00FFC3" },
    { label: "Active Campaigns", value: profile.activeCampaigns, color: "#1DE9B6" },
    { label: "Completed Campaigns", value: profile.completedCampaigns, color: "#FFD740" },
    { label: "Total Spent", value: `₹${profile.totalSpent}`, color: "#FF5252" },
    { label: "Success Rate", value: `${profile.successRate}%`, color: "#40C4FF" }
  ];

  return (
    <div className="profile-page-modern">
      <div className="profile-container">

        <section className="profile-header-modern">
          <img
            src={profile.avatar || "/default-avatar.png"}
            alt="Profile"
            className="profile-avatar"
          />
          <div className="profile-info">
            <div className="profile-top">
              <h2 className="profile-name">{profile.name}</h2>
              <span className={`status-badge ${profile.status.toLowerCase()}`}></span>
            </div>
            <p className="role">{profile.role}</p>
            <div className="contact-info">
              <p>Email: {profile.email}</p>
              <p>Phone: {profile.phone}</p>
              <p>Company: {profile.companyName}</p>
              <p>Website: {profile.website}</p>
            </div>
          </div>
          <button className="btn primary edit-profile">Edit Profile</button>
        </section>

        <section className="section-modern">
          <h3>Your Contact for Messages</h3>
          <div className="info-grid-modern">
            <div className="info-item-modern">
              <FaMobileAlt className="icon" /> {profile.twilioNumber}
            </div>
            <div className="info-item-modern">
              Verified: {profile.twilioVerified ? "Yes" : "No"}
              {!profile.twilioVerified && (
                <button
                  style={{ marginLeft: "10px" }}
                  className="btn primary"
                  onClick={() => { setShowPopup(true); sendOtp(); }}
                >
                  Verify Number
                </button>
              )}
            </div>
          </div>
        </section>

        <div className="sections-row">
          <section className="section-modern">
            <h3>Business Information</h3>
            <div className="info-grid-modern">
              <div className="info-item-modern"><FaBuilding className="icon" /> {profile.companyName}</div>
              <div className="info-item-modern"><FaMapMarkerAlt className="icon" /> {profile.website}</div>
              <div className="info-item-modern"><FaCreditCard className="icon" /> {profile.plan}</div>
            </div>
          </section>

          <section className="section-modern">
            <h3>Campaign Metrics</h3>
            <div className="metrics-grid-modern">
              {campaignMetrics.map((m) => (
                <div key={m.label} className="metric-box-modern" style={{ borderTop: `4px solid ${m.color}`, color: m.color }}>
                  <p>{m.label}</p>
                  <strong>{m.value}</strong>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="section-modern">
          <h3>Files & Documents</h3>
          {profile.files.length === 0 ? (
            <p>No files uploaded yet.</p>
          ) : (
            <div className="files-grid-modern">
              {profile.files.map((f) => (
                <div key={f.name} className="file-row-modern">
                  <span className="file-name">
                    {f.type.includes("pdf") ? <FaFileAlt className="file-icon" /> : <FaFileImage className="file-icon" />}
                    {f.name} - Uploaded: {f.uploadedOn}
                  </span>
                  <button className="btn ghost">Download</button>
                </div>
              ))}
              <button className="btn primary">Upload New File</button>
            </div>
          )}
        </section>

        {showPopup && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "25px",
                width: "350px",
                borderRadius: "10px",
                color: "#000"
              }}
            >
              <h3>Verify Mobile Number</h3>
              <p>Sending OTP to: {profile.twilioNumber}</p>

              {otpSent ? (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginTop: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc"
                    }}
                  />
                  <button
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginTop: "15px",
                      borderRadius: "6px",
                      background: "#0b57d0",
                      color: "white",
                      cursor: "pointer"
                    }}
                    onClick={verifyOtp}
                    disabled={verifying}
                  >
                    {verifying ? "Verifying..." : "Submit OTP"}
                  </button>
                </>
              ) : (
                <p>Sending OTP...</p>
              )}

              <button
                onClick={() => setShowPopup(false)}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "10px",
                  background: "#888",
                  borderRadius: "6px",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ClientProfile;
