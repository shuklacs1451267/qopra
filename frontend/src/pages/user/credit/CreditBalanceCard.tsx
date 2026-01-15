import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../../../styles/userCss/credit/CreditBalanceCard.css';

interface CreditBalanceCardProps {
  currentBalance: number;
}

export const CreditBalanceCard: React.FC<CreditBalanceCardProps> = ({ currentBalance }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [amount, setAmount] = useState<number>(0);  // for payment amount
  const [credit, setCredit] = useState<number>(0);  // for actual credits to add

  const openModal = () => setModalOpen(true);

  const closeModal = () => {
    setModalOpen(false);
    setAmount(0);
    setCredit(0);
  };

  const handleAdd = () => {
    alert(`Amount: $${amount}\nCredits: ${credit}`);
    closeModal();
  };

  const modalContent = (
    <div className="cbc-modal-backdrop">
      <div className="cbc-modal">
        <h3>Add Credits</h3>

        <div className="cbc-modal-body">
          {/* Left Section */}
          <div className="cbc-modal-left">
            <p>Enter Amount ($)</p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
            />

            <p>Enter Credits</p>
            <input
              type="number"
              value={credit}
              onChange={(e) => setCredit(Number(e.target.value))}
              placeholder="Enter credit"
            />

            <button className="cbc-btn-primary" onClick={handleAdd}>
              Add
            </button>
          </div>

          {/* Right Section */}
          <div className="cbc-modal-right">
            <p>Select Payment Method</p>
            <div className="cbc-payment-card visa">VISA **** 1234</div>
            <div className="cbc-payment-card add-new">+ Add New Card</div>
            <div className="cbc-payment-card manage">Manage Saved Cards</div>
          </div>
        </div>

        <button className="cbc-btn-secondary modal-close" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="cbc-card">
      <h3 className="cbc-title">Current Credit Balance</h3>

      <div className="cbc-balance">
        <span className="cbc-amount">{currentBalance.toLocaleString()}</span>
        <span className="cbc-currency">$</span>
      </div>

      <div className="cbc-actions">
        <button className="cbc-btn-primary" onClick={openModal}>
          Add Credits
        </button>
        <button className="cbc-btn-secondary">Setup Auto-Recharge</button>
      </div>

      <div className="cbc-cards-preview">
        <div className="cbc-card-item visa">VISA **** 1234</div>
        <div className="cbc-card-item add-new">+ Add New Card</div>
        <div className="cbc-card-item manage">Manage Saved Cards</div>
      </div>

      {isModalOpen && ReactDOM.createPortal(modalContent, document.body)}
    </div>
  );
};
