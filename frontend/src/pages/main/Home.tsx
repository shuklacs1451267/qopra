import { Link } from "react-router-dom";
import "../../styles/home.css";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Grow Your Business With Smart Messaging</h1>
        <p>
          Send WhatsApp, SMS & Email campaigns in one simple platform.
          Automate, track & boost engagement instantly.
        </p>
        <div className="hero-buttons">
          <Link to="/login" className="btn-primary">Login</Link>
          <Link to="/register" className="btn-outline">Create Account</Link>
        </div>
      </section>

      <section className="features">
        <h2>Our Services</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>WhatsApp Campaigns</h3>
            <p>Send bulk WhatsApp messages with media, templates & reports.</p>
          </div>
          <div className="feature-card">
            <h3>SMS Campaigns</h3>
            <p>Promotional + OTP messages with delivery tracking.</p>
          </div>
          <div className="feature-card">
            <h3>Email Campaigns</h3>
            <p>Send newsletters & marketing emails with analytics.</p>
          </div>
        </div>
      </section>

      <section className="why-section">
        <h2>Why Choose Us</h2>
        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">⚡</div>
            <h3>Fast Delivery</h3>
            <p>Ultra-fast message routing and 99% uptime.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">💰</div>
            <h3>Affordable Pricing</h3>
            <p>Lowest market pricing designed for every business.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">👌</div>
            <h3>Easy to Use</h3>
            <p>Simple dashboard — launch campaigns in seconds.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
