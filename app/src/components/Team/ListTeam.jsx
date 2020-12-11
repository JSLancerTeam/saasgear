import React from 'react';
import { Link } from 'react-router-dom';
import PropsType from 'prop-types';

import AddIcon from 'assets/images/svg/add.svg';

export default function ListTeam({ teams }) {
  return (
    <div className="border-2 p-8 rounded shadow">
      <div className="text-xl"> My Teams</div>
      <table className="my-4" width="100%">
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Name</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(it => <tr key={it.teamID} className="border-t-2">
            <td width="90%" className="p-2">{it.teamName}</td>
            <td width="10%" className="text-center p-2">
              <Link
                to={`/teams/edit/${it.teamID}`}
                className="hover:underline hover:text-blue-800 cursor-pointer text-blue-500 mr-3"
              >
                Edit
              </Link>
              <Link
                to='/teams'
                className="hover:underline hover:text-blue-800 cursor-pointer text-blue-500"
              >
                Delete
              </Link>
            </td>
          </tr>)}
        </tbody>
      </table>
      <Link
        to="/teams/new"
        className="group relative inline-flex justify-center align-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
      >
        <img src={AddIcon} alt="addd icon" className="mr-2" />
            Create Team
      </Link>
    </div>
  );
}
ListTeam.propTypes = {
  teams: PropsType.arrayOf(
    PropsType.shape({
      teamName: PropsType.string,
      teamID: PropsType.string
    })
  )
};