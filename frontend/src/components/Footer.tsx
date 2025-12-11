import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-left">
          <h3>Qopra</h3>
          {/* <p>
            Your all-in-one platform for WhatsApp, SMS & Email marketing. Automate campaigns, track performance, and grow your business effortlessly.
          </p> */}
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: support@qopra.com</p>
          <p>Phone: +91 90144 65414</p>
          <p>Address: Hyderabad, India</p>
        </div>

        {/* Social Links */}
        <div className="footer-social">
          <h4>Follow Us</h4>

          <a href="#" className="social-row">
            <FaFacebook className="icon" />
            <span>Facebook</span>
          </a>

          <a href="#" className="social-row">
            <FaInstagram className="icon" />
            <span>Instagram</span>
          </a>

          <a href="#" className="social-row">
            <FaLinkedin className="icon" />
            <span>LinkedIn</span>
          </a>
        </div>

      </div>
    </footer>
  );
}
