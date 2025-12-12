import React from 'react';
import '../../../styles/userCss/credit/CreditUsageHistory.css';

const usageData = [
  { date: 'Holiday Promo', campaign: 'WhatsApp Marketing', messageType: 5000, credits: 500, recipients: '$50.00', cost: '$50.00' },
  { date: 'Login OTP', campaign: 'SMS Transactional', messageType: 150, credits: 150, recipients: '$1.50', cost: '$50.00' },
  { date: 'Weekly Newsletter', campaign: 'Email Marketing', messageType: 10000, credits: 0, recipients: '(Unlimited Tier)', cost: '$50.00' },
];

export const CreditUsageHistory: React.FC = () => {
  return (
    <div className="cuh-card">
      <h3 className="cuh-title">Credit Usage History</h3>
      <div className="cuh-table-wrapper">
        <table className="cuh-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Campaign</th>
              <th>Message Type</th>
              <th>Credits Deducted</th>
              <th>Recipients</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {usageData.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.campaign}</td>
                <td>{item.messageType}</td>
                <td>{item.credits}</td>
                <td>{item.recipients}</td>
                <td>{item.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a href="#" className="cuh-link">View Detailed Reports</a>
    </div>
  );
};
