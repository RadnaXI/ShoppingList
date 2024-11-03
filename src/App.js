import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ShoppingListOverview from './components/ShoppingListOverview';
import ShoppingListDetail from './components/ShoppingListDetail';

const App = () => {
  return (
    <Routes>
      <Route path="/shopping-list" element={<ShoppingListOverview />} />
      <Route path="/shopping-list/list-detail/:id" element={<ShoppingListDetail />} />
    </Routes>
  );
};

export default App;