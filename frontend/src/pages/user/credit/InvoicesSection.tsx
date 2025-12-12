import React from 'react';
import '../../../styles/userCss/credit/InvoicesSection.css';

const invoiceData = [
  { number: 'Invoice-10-126', type: 205, messageType: 202, estimate: 100, cost: '$50.00', download: true },
  { number: 'Invoice-11-127', type: 208, messageType: 200, estimate: 150, cost: '$75.00', download: true },
  { number: 'Invoice-12-128', type: 210, messageType: 205, estimate: 200, cost: '$100.00', download: true },
];

export const InvoicesSection: React.FC = () => {
  return (
    <div className="inv-card">
      <h3 className="inv-title">Invoices</h3>

      <div className="inv-filter-row">
        <label>Campaign Type:</label>
        <select>
          <option>WhatsApp Marketing</option>
        </select>
        <button className="inv-btn">Download</button>
      </div>

      <div className="inv-grid">
        {invoiceData.map((item, index) => (
          <div className="inv-row" key={index}>
            <div className="inv-item">{item.number}</div>
            <div className="inv-item">{item.type}</div>
            <div className="inv-item">{item.messageType}</div>
            <div className="inv-item">{item.estimate}</div>
            <div className="inv-item inv-cost">{item.cost}</div>
            {item.download && <button className="inv-download-btn">Download</button>}
          </div>
        ))}
      </div>
    </div>
  );
};
