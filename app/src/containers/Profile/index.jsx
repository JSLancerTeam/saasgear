import React, { useState } from 'react';
import Tabs from 'components/Profile/Tabs';
import AccountSetting from './AccountSetting';
import PlanSetting from './PlanSetting';
import SecuritySetting from './SecuritySetting';

const Profile = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, name: 'Account Setting' },
    { id: 2, name: 'Plan Setting' },
    { id: 3, name: 'Security Setting' },
  ];

  return (
    <div className="flex flex-wrap">
      <div className="w-full p-4 mb-4 rounded-lg bg-white border border-grey-100 dark:bg-grey-895 dark:border-grey-890">
        <div className="flex flex-row items-center justify-start p-4">
          <div className="flex-shrink-0 w-24">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="media"
              className="rounded-full h-20 w-20 shadow-outline mb-2"
            />
          </div>
          <div className="py-2 px-2">
            <p className="text-base font-bold whitespace-no-wrap">
              Lucas Smith
            </p>
            <p className="text-sm text-grey-500 whitespace-no-wrap">
              Vital Database Dude
            </p>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full p-4">
            <div className="flex flex-wrap flex-col w-full tabs">
              <div className="bg-white">
                <Tabs
                  tabs={tabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>
              <AccountSetting isActive={activeTab === 1} />
              <PlanSetting isActive={activeTab === 2} />
              <SecuritySetting isActive={activeTab === 3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
