import React from 'react';
import '../../../styles/userCss/credit/CostCalculator.css';

export const CostCalculator: React.FC = () => {
  return (
    <div className="cc-card">
      <h3 className="cc-title">Cost Calculator</h3>

      <div className="cc-row">
        <span>Campaign Type</span>
        <select>
          <option>WhatsApp Marketing</option>
        </select>
      </div>

      <div className="cc-row">
        <span>Message (Template)</span>
        <input type="text" defaultValue="Linnite" />
      </div>

      <div className="cc-row">
        <span>Number Type</span>
        <input type="text" defaultValue="20?" />
      </div>

      <div className="cc-row">
        <span>Estimate</span>
        <input type="text" defaultValue="100" />
      </div>

      <div className="cc-row cc-estimate">
        <span>Estimated Cost</span>
        <span className="cc-value">$100.00</span>
      </div>
    </div>
  );
};
