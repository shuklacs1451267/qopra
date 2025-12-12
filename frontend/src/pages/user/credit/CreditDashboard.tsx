import React from "react";
import '../../../styles/userCss/credit/CreditDashboard.css';
import { CreditBalanceCard } from "./CreditBalanceCard";
import { LowCreditAlerts } from "./LowCreditAlerts";
import { CreditUsageHistory } from "./CreditUsageHistory";
import { CostCalculator } from "./CostCalculator";
import { InvoicesSection } from "./InvoicesSection";

const CreditDashboard: React.FC = () => {
  return (
    <div className="cd-container">
      <header className="cd-header">
        <h1 className="cd-title">Billing & Credits</h1>
        <div className="cd-actions">
          <input type="text" placeholder="Search..." className="cd-search" />
          <button className="cd-btn">Select</button>
        </div>
      </header>

      <div className="cd-content">
        <aside className="cd-sidebar">
          <div className="cd-brand">CarcentRite</div>
          <nav className="cd-nav">
            <ul>
              <li className="cd-nav-item active">Billing & Credits</li>
              <li className="cd-nav-item">Arodkit Codes</li>
              <li className="cd-nav-item">Bre Cht</li>
            </ul>
            <div className="cd-separator">Payment Methods</div>
            <ul>
              <li className="cd-nav-item">Saved Type &gt;</li>
              <li className="cd-nav-item">Manage Saved Cards</li>
              <li className="cd-nav-item">Restingploys</li>
            </ul>
          </nav>
        </aside>

        <main className="cd-main">
          <section className="cd-top-widgets">
            <CreditBalanceCard currentBalance={18500} />
            <LowCreditAlerts />
          </section>

          <section className="cd-usage card">
            <CreditUsageHistory />
          </section>

          <section className="cd-bottom-sections">
            <CostCalculator />
            <InvoicesSection />
          </section>
        </main>
      </div>
    </div>
  );
};

export default CreditDashboard;
