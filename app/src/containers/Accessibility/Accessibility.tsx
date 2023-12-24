import React from 'react';
import './Accessibility.css'; // Make sure your CSS file is updated with the styles for the accordion

const Accessibility = () => (
  <div className="accessibility-wrapper">
    <div className="search-bar-container">
      <input type="text" placeholder="Enter a domain" className="search-input" />
      <button className="search-button">Free Scan</button>
    </div>
    <div className="accessibility-container">
      <div className="accessibility-card">
        <div className="card-header">Status</div>
        <div className="card-status not-compliant">Not Compliant</div>
        <p>Your site doesn&apos;t comply with WCAG 2.1 AA.</p>
      </div>
      <div className="accessibility-card">
        <div className="card-header">Accessibility Score</div>
        <div className="card-score">
          <div className="score-circle">
            <span>20%</span>
          </div>
        </div>
        <p>Websites with a score of 70% or lower are considered at high risk.</p>
      </div>
      <div className="accessibility-card">
        <div className="card-header">Lawsuit Risk</div>
        <div className="card-risk high">High</div>
        <p>Multiple violations may be exposing your site to legal action.</p>
      </div>
      {/* Accordion Section */}
      <div className="accordion w-full">
        <details>
          <summary>Blind <span className="fail-count">45 Fail</span></summary>
          <p>Details about Blind accessibility issues...</p>
        </details>
        <details>
          <summary>Deafblind <span className="fail-count">36 Fail</span></summary>
          <p>Details about Deafblind accessibility issues...</p>
        </details>
        <details>
          <summary>Mobility <span className="fail-count">33 Fail</span></summary>
          <p>Details about Mobility accessibility issues...</p>
        </details>
        <details>
          <summary>Low Vision <span className="fail-count">24 Fail</span></summary>
          <p>Details about Low Vision accessibility issues...</p>
        </details>
      </div>
    </div>
  </div>
);

export default Accessibility;
