import React from 'react';
import '../../../styles/userCss/credit/CreditBalanceCard.css';

interface CreditBalanceCardProps {
  currentBalance: number;
}

export const CreditBalanceCard: React.FC<CreditBalanceCardProps> = ({ currentBalance }) => {
  return (
    <div className="cbc-card">
      <h3 className="cbc-title">Current Credit Balance</h3>
      <div className="cbc-balance">
        <span className="cbc-amount">{currentBalance.toLocaleString()}</span>
        <span className="cbc-currency">$</span>
      </div>

      <div className="cbc-actions">
        <button className="cbc-btn-primary">Add Credits</button>
        <button className="cbc-btn-secondary">Setup Auto-Recharge</button>
      </div>

      <div className="cbc-cards-preview">
        <div className="cbc-card-item visa">VISA **** 1234</div>
        <div className="cbc-card-item add-new">+ Add New Card</div>
        <div className="cbc-card-item manage">Manage Saved Cards</div>
      </div>
    </div>
  );
};
