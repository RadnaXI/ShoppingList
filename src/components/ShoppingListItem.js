import React from 'react';

function ListItem({ item, onMarkResolved, onRemove }) {
  return (
    <div>
      <span>{item.name}</span>
      <input type="checkbox" checked={item.resolved} onChange={(e) => onMarkResolved(e.target.checked)} />
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}

export default ListItem;