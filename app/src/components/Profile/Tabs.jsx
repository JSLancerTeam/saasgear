import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <nav className="flex flex-row">
      {tabs.map((tab) => (
        <button
          type="button"
          className={cn(
            'text-sm font-bold p-4 block hover:text-blue-500 focus:outline-none border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100',
            { 'text-blue-500 border-opacity-100': activeTab === tab.id },
          )}
          onClick={() => setActiveTab(tab.id)}
          key={tab.id}
        >
          {tab.name}
        </button>
      ))}
    </nav>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  activeTab: PropTypes.number.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default Tabs;
