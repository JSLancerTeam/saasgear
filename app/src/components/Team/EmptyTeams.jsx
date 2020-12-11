import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import AddIcon from 'assets/images/svg/add.svg';

export default function EmptyTeams() {
  const fakeAvatars = useMemo(
    () =>
      Array.from(
        { length: 9 },
        () =>
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      ),
    [],
  );

  return (
    <div className="border-2 p-8 rounded shadow">
      <div className="flex">
        <div className="w-2/6">
          <div className="grid grid-cols-3 gap-2">
            {fakeAvatars.map((it, index) => (
              <div className="col-span-1" key={`aaaa-${Math.random()}`}>
                <img src={it} className="h-24 w-24 rounded-full" alt={index} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-4/6">
          <div className="text-xl font-semibold">No Teams Yet!</div>
          <p className="mb-4">Create your first team below to get started</p>
          <Link
            to="/teams/new"
            className="group relative flex justify-center align-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            <img src={AddIcon} alt="addd icon" className="mr-2" />
            Create Team
          </Link>
        </div>
      </div>
    </div>
  );
}
EmptyTeams.propTypes = {
};
