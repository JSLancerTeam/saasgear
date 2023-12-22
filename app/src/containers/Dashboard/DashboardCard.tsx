import React from 'react';
import './DashboardCard.css'; 

interface CardProps {
  heading: string;
  count: number;
  countType: string;

}

const DashboardCard: React.FC<CardProps> = ({ heading, count, countType }) => (
  <div className="dashboard-card">
    <div className="card-content">
      <div className="card-header">
        <h2 className="card-title">{heading}</h2>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Icon-round-Question_mark.svg"
          alt="help icon"
          className="help-icon"
        />
      </div>
      <div className="card-body">
        <span className="card-count">{count}</span>
        <span className="card-count-type">{countType}</span>
      </div>

    </div>
  </div>
);

export default DashboardCard;
