import React, { useState, FormEvent } from 'react';
import './Teams.css';

interface DomainFormData {
  domainName: string;
}

const Teams: React.FC = () => {
  const [formData, setFormData] = useState<DomainFormData>({ domainName: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://your-backend-endpoint.com/domains',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error adding domain:', error);
    }
  };

  return (
    <>
      <h3 className="font-bold text-[26px] leading-9 text-sapphire-blue mb-8">
        Add new domain
      </h3>
      <div className="add-domain-container">

        <div className="add-domain-form-container">
          <form onSubmit={handleSubmit} className="add-domain-form">
            <div className="form-group">
              <input
                type="text"
                id="domainName"
                name="domainName"
                placeholder="Enter domain name"
                value={formData.domainName}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="submit-btn">
              Add Domain
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Teams;
