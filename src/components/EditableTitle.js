import React, { useState } from 'react';

function EditableTitle({ title, isOwner, onChangeTitle }) {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleSave = () => {
    onChangeTitle(newTitle);
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <h1 onClick={() => isOwner && setEditing(true)}>{title}</h1>
      )}
    </div>
  );
}

export default EditableTitle;