import React from 'react';

function MembersList({ members, onRemoveMember, onLeaveList }) {
  return (
    <div>
      <h3>Members</h3>
      {members.map(member => (
        <div key={member.id}>
          {member.name}
          <button onClick={() => onRemoveMember(member.id)}>Remove</button>
        </div>
      ))}
      <button onClick={onLeaveList}>Leave List</button>
    </div>
  );
}

export default MembersList;