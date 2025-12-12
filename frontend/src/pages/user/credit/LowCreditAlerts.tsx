import React from 'react';
import '../../../styles/userCss/credit/LowCreditAlerts.css';

export const LowCreditAlerts: React.FC = () => {
  return (
    <div className="lca-card">
      <h3 className="lca-title">Low Credit Alerts</h3>
      <div className="lca-toggle-row">
        <span>Alerts</span>
        <label className="lca-switch">
          <input type="checkbox" defaultChecked />
          <span className="lca-slider round"></span>
        </label>
      </div>

      <p className="lca-text">Notify me when credits drop below:</p>
      <div className="lca-settings">
        <input type="number" defaultValue={500} className="lca-input" />
        <button className="lca-btn">Add New Card</button>
      </div>

      <div className="lca-saved-cards">
        <div className="lca-card-item farwd">Farwd Ird Canti ****</div>
        <div className="lca-card-item manage">Manage Saved Cards</div>
      </div>
    </div>
  );
};
