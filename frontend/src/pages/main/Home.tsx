import { Link } from "react-router-dom";
import { useState } from "react";
import "../../styles/Home.css";
import Footer from "../../components/Footer";
import whatsappImg from "../../assets/image/bulk-whatsapp.png";
import smsImg from "../../assets/image/bulk-sms.png";
import emailImg from "../../assets/image/email-marketing.png";
import automationImg from "../../assets/image/automation.png";




export default function Home() {
  const demoImages = {
    whatsapp: whatsappImg,
    sms: smsImg,
    email: emailImg,
    automation: automationImg,
  };


  const screenshots = [
    "/1.jpg",
    "/2.jpg",
    "/3.jpg",
    "/4.jpg",
    "/5.jpg",
    "/6.jpg",
  ];
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % screenshots.length);
  const prev = () => setCurrent((p) => (p - 1 + screenshots.length) % screenshots.length);

  return (
    <div className="home-container">

      {/* HERO */}
      <section id="hero" className="hero">
        <h1>Powerful Messaging for Modern Businesses</h1>
        <p>
          Send Bulk WhatsApp, SMS & Email campaigns from one clean dashboard.
          Reliable delivery, automation, reports & everything you need to scale.
        </p>
        <div className="hero-buttons">
          {/* <Link to="/register" className="btn-primary">Start Free</Link> */}
          <Link to="/login" className="btn-outline">Login</Link>
        </div>
        <div className="hero-stats">
          <div><h3>10M+</h3><p>Messages Sent</p></div>
          <div><h3>4K+</h3><p>Businesses</p></div>
          <div><h3>99%</h3><p>Delivery Rate</p></div>
        </div>
      </section>

      {/* FEATURES / SERVICES */}
      <section id="services" className="features">
        <h2>Our Messaging Services</h2>

        {/* Bulk WhatsApp */}
        <div className="feature-row">
          <div className="feature-text">
            <h3>Bulk WhatsApp</h3>
            <p>
              Bulk WhatsApp messaging allows businesses to send text, media, buttons, and rich interactive messages to multiple customers simultaneously.
              With this service, you can schedule campaigns, automate replies, and maintain high engagement rates.
              Whether you are sending promotional content, transactional updates, or customer notifications, our system ensures delivery in real-time.
              Our dashboard provides analytics such as delivered messages, response rates, and click-through metrics.
              Using WhatsApp's official APIs, your campaigns are compliant and secure.
              This service is ideal for businesses looking to communicate efficiently without manual intervention.
              You can personalize messages with customer names, dynamic fields, and attach images, videos, or PDF files to enhance your messaging strategy.
              Automated replies help you maintain a 24/7 presence, responding instantly to customer queries and maintaining high satisfaction.
              Whether running marketing campaigns, transactional alerts, or customer engagement flows, Bulk WhatsApp gives you reliability, speed, and professional delivery.
            </p>
          </div>
          <div className="feature-image">
            <img src={demoImages.whatsapp} alt="Bulk WhatsApp" />
          </div>
        </div>

        {/* Bulk SMS */}
        <div className="feature-row">
          <div className="feature-text">
            <h3>Bulk SMS</h3>
            <p>
              Bulk SMS messaging is a fast and reliable way to reach your customers instantly via text messages.
              Ideal for transactional alerts, promotional campaigns, reminders, and OTP verification, it guarantees high delivery rates.
              Our platform supports sending SMS to thousands of users simultaneously without delay.
              Detailed delivery reports help track successful delivery, failed attempts, and responses.
              Personalize your SMS campaigns with customer names, dynamic variables, and localized content to improve engagement.
              Automated scheduling lets you send messages at optimal times, increasing the effectiveness of your marketing campaigns.
              Integration with APIs allows developers to trigger SMS from their applications seamlessly.
              With our system, you can run multiple campaigns concurrently while maintaining the integrity and speed of each message.
              The service supports both domestic and international messaging, allowing businesses to expand their reach efficiently.
              Using Bulk SMS ensures immediate communication, especially for time-sensitive information like OTPs, alerts, and confirmations.
            </p>
          </div>
          <div className="feature-image">
            <img src={demoImages.sms} alt="Bulk SMS" />
          </div>
        </div>

        {/* Email Marketing */}
        <div className="feature-row">
          <div className="feature-text">
            <h3>Email Marketing</h3>
            <p>
              Email Marketing is a powerful tool for nurturing leads, engaging customers, and building brand loyalty.
              Create personalized newsletters, promotional campaigns, and transactional emails with beautifully designed templates.
              Track open rates, clicks, conversions, and engagement metrics in real-time using our analytics dashboard.
              Automation workflows allow sending triggered emails based on user behavior, events, or scheduled sequences.
              Segment your audience to target the right customers with the right message, improving campaign effectiveness.
              Our platform ensures high inbox deliverability, reducing the chances of emails landing in spam.
              Integrate email marketing with other channels like WhatsApp and SMS for omnichannel communication.
              Use dynamic content, images, and attachments to make your campaigns visually engaging and professional.
              Businesses can run drip campaigns, welcome sequences, re-engagement emails, and promotional blasts seamlessly.
              Email marketing is essential for scaling communication, building trust, and increasing revenue.
              With personalized campaigns, automated workflows, and real-time insights, your marketing efforts become more strategic and measurable.
            </p>
          </div>
          <div className="feature-image">
            <img src={demoImages.email} alt="Email Marketing" />
          </div>
        </div>

        {/* Automation */}
        {/* <div className="feature-row">
          <div className="feature-text">
            <h3>Automation</h3>
            <p>
              Automation enables businesses to set up intelligent workflows for WhatsApp, SMS, and Email without manual intervention.
              Trigger messages based on user actions, specific dates, or predefined events to maintain consistent communication.
              With automation, you can nurture leads, onboard new customers, and send follow-up messages automatically.
              Combine multiple channels in a single workflow to maximize reach and engagement.
              Real-time reporting lets you monitor which triggers were executed, message delivery, and user responses.
              Automation reduces human error, saves time, and ensures timely interactions with your audience.
              Use automation to create sequences like welcome emails, abandoned cart reminders, post-purchase follow-ups, and loyalty campaigns.
              Integrate with your existing CRM or business systems for seamless data flow.
              Automation ensures personalized communication at scale, delivering relevant messages to the right customer at the right time.
              This increases engagement, conversion, and customer satisfaction while reducing operational effort.
              Businesses can leverage automation to streamline processes, maintain professionalism, and deliver consistent customer experiences.
            </p>
          </div>
          <div className="feature-image">
            <img src={demoImages.automation} alt="Automation" />
          </div>
        </div> */}

      </section>

      {/* SLIDER */}
      <section id="demo" className="demo-slider">
        <h2>Platform</h2>
        <p className="demo-sub">Preview our clean and fast Platform.</p>
        <div className="slider-container">
          <button className="arrow left" onClick={prev}>❮</button>
          <img src={screenshots[current]} className="slide-image" alt="Demo screenshot" />
          <button className="arrow right" onClick={next}>❯</button>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-section">
        <h2>Why Choose Us</h2>
        <div className="why-grid">
          <div className="why-card"><h3>Lightning Fast</h3><p>Optimized routes ensure messages are delivered instantly, keeping your communication smooth and reliable.</p></div>
          <div className="why-card"><h3>Highly Secure</h3><p>End-to-end encryption and secure APIs protect your data, ensuring complete privacy and safety.</p></div>
          <div className="why-card"><h3>Global Network</h3><p>Reach customers in 150+ countries using our fast and reliable international infrastructure.</p></div>
          <div className="why-card"><h3>Deep Insights</h3><p>Get real-time analytics on message delivery, opens, clicks, and user engagement to make data-driven decisions.</p></div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <h2>Need Help or Custom Pricing?</h2>
        <p className="contact-sub">Our support team is available 24/7 to assist you with any query.</p>
        <div className="contact-card">
          <h3>📞 +91 8726361818</h3>
          <h3>📧 info@socialstech.com </h3>
        </div>
        {/* <Link to="/register" className="btn-primary big-contact-btn">
          Get Started Today
        </Link> */}
      </section>

      <Footer />
    </div>
  );
}
