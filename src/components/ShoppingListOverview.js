import React from 'react';

const ShoppingListOverview = () => {
  const lists = [];
  
  const CreateList = () => {
    console.log('Create a new list');
  };
  
  const onToggleShowArchived = () => {
    console.log('Toggle show archived lists');
  };

  return (
    <div>
      <h1>Shopping List Overview</h1>
      <button onClick={CreateList}>Create New List</button>
      <button onClick={onToggleShowArchived}>Toggle Archived Lists</button>
    </div>
  );
};

export default ShoppingListOverview;