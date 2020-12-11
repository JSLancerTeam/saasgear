import React from 'react';
import PropsType from 'prop-types';

export default function ListTeamMember({ teamMembers, handleAction }) {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th style={{ textAlign: "left" }}>Member</th>
          <th style={{ textAlign: "left" }}>Role</th>
        </tr>
      </thead>
      <tbody>
        {teamMembers ? teamMembers.map(it => <tr key={it.userId} className="border-t-2">
          <td width="70%" className="py-2">{it.email}</td>
          <td width="10%" className="py-2">
            {it.isOwner ? 'admin' : 'member'}
          </td>
          {handleAction && <td width="20%">
            <div className="flex">
              <button type="button" className="mr-4 hover:underline hover:text-blue-800 cursor-pointer text-blue-500">Cancle</button>
              <button type="button" className="hover:underline hover:text-blue-800 cursor-pointer text-blue-500">Invitation</button>
            </div>
          </td>}
        </tr>) :
          <tr>
            <td colSpan={2} className="text-center border-t-2 py-2">Trống</td>
          </tr>}
      </tbody>
    </table>
  );
}

ListTeamMember.propTypes = {
  teamMembers: PropsType.arrayOf(
    PropsType.shape({
      teamName: PropsType.string,
      teamID: PropsType.string
    })
  ),
  handleAction: PropsType.func
};