import React, { useState, useEffect } from 'react';
import Button from '../templates/Button';
import Input from '../templates/Input';
import List from '../templates/List';
import { useNavigate } from 'react-router-dom';

const ShoppingListOverview = () => {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim()) {
      if (editingItem) {
        const updatedItems = items.map(item => (item === editingItem ? inputValue : item));
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
        setEditingItem(null);
      } else {
        const updatedItems = [...items, inputValue];
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
      }
      setInputValue('');
    }
  };

  const handleRemoveItem = (itemToRemove) => {
    const updatedItems = items.filter(item => item !== itemToRemove);
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const handleEditItem = (item) => {
    setInputValue(item);
    setEditingItem(item);
  };

  const goToDetail = (item) => {
    nav(`/shopping-list/list-detail/${encodeURIComponent(item)}`);
  };

  let nav = useNavigate();

  useEffect(() => {
    const savedItems = localStorage.getItem('items');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  return (
    <div className="flex flex-col items-center h-screen space-y-4 bg-slate-50">
      <div className="flex items-center w-full max-w-3xl mt-10 space-x-4">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          className="flex-grow"
          placeholder={"Zadej název seznamu"}
        />
        <Button
          onClick={handleAddItem}
          text={editingItem ? "Uložit" : "Přidat"}
          className="px-6"
        />
      </div>
      <List
        items={items}
        onRemoveItem={handleRemoveItem}
        onClick={goToDetail}
        onEditItem={handleEditItem}
      />
    </div>
  );
};

export default ShoppingListOverview;
