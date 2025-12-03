import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/register.css";
import Footer from "../../components/Footer";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    companyName: "",
    website: "",
    plan: "free",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      if (res.data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <div className="register-page">
        <div className="register-left">
          <img src="/logo-removebg.png" alt="Logo" className="register-logo" />
          <h2>Join Smart Messaging</h2>
          <p>Grow your business with WhatsApp, SMS & Email campaigns.</p>
        </div>

        <div className="register-right">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2>Create Account</h2>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Website URL"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />

            <select name="plan" value={formData.plan} onChange={handleChange}>
              <option value="free">Free Plan</option>
              <option value="pro">Pro Plan</option>
              <option value="enterprise">Enterprise Plan</option>
            </select>

            <button type="submit" className="register-btn">Register</button>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>

  );
}
