import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import ShoppingListOverview from './components/ShoppingListOverview';
import ShoppingListDetail from './components/ShoppingListDetail';

const App = () => {
  return (
    <BrowserRouter>
    <header className="flex justify-between items-center bg-slate-100 p-4 shadow-md">
      <h1 className="text-3xl font-bold">Shopping Lists</h1>
      <Link to="/" className="text-blue-500 hover:underline">
        Overview
      </Link>
    </header>
    <main className="p-4">
      <Routes>
        <Route path="/" element={<ShoppingListOverview />} />
        <Route path="/shopping-list/list-detail/:id" element={<ShoppingListDetail />} />
      </Routes>
    </main>
  </BrowserRouter>
  );
};

export default App;