import React, { useState, useEffect } from 'react';
import Modal from '../templates/Modal';
import List from '../templates/List';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Button from '../templates/Button';

const ShoppingListOverview = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInput, setModalInput] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  const nav = useNavigate();

  const loggedInUser = localStorage.getItem('loggedInUser');
  const storageKey = `shoppingList_${loggedInUser}`;

  useEffect(() => {
    const savedItems = localStorage.getItem(storageKey);
    const savedUsers = localStorage.getItem('users');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } 
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    if (!loggedInUser) {
      nav('/login');
    }
  }, [loggedInUser, nav]);

  const saveItemsToLocalStorage = (updatedItems) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Error saving shopping list to localStorage:', error);
    }
  };

  const openAddItemModal = () => {
    setModalInput('');
    setEditingItem(null);
    setIsModalOpen(true);
  };
  const handleEditItem = (item) => {
    setModalInput(item.name);
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAddOrEditItem = () => {
    if (modalInput.trim()) {
      let updatedItems;

      if (editingItem) {
        updatedItems = items.map((item) =>
          item.id === editingItem.id ? { ...item, name: modalInput } : item
        );
      } else {
        const newItem = { id: uuidv4(), name: modalInput };
        updatedItems = [...items, newItem];
      }

      setItems(updatedItems);
      saveItemsToLocalStorage(updatedItems);
      setIsModalOpen(false);
    }
  };

  const handleRemoveItem = (itemToRemove) => {
    const updatedItems = items.filter((item) => item.id !== itemToRemove.id);
    setItems(updatedItems);
    saveItemsToLocalStorage(updatedItems);
  };

  const handleAddUser = () => {
    const userExists = users.find(user => user === newUser.trim());
    if (userExists && !users.includes(newUser.trim())) {
      setUsers([...users, newUser.trim()]);
      localStorage.setItem('users', JSON.stringify([...users, newUser.trim()]));
      setNewUser('');
    }
  };

  const confirmRemoveItem = (item) => {
    setItemToDelete(item);
    setIsDeleteConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      handleRemoveItem(itemToDelete);
      setItemToDelete(null);
    }
    setIsDeleteConfirmModalOpen(false);
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    setIsDeleteConfirmModalOpen(false);
  };

  const goToDetail = (item) => {
    nav(`/shopping-list/list-detail/${item.id}`);
  };

  return (
    <div className="flex flex-col items-center h-screen space-y-4 bg-slate-50">
      <List
        items={items}
        onRemoveItem={confirmRemoveItem}
        onClick={goToDetail}
        onEditItem={handleEditItem}
      />
      <div
        className="fixed bottom-5 w-full max-w-3xl px-5"
      >
        <Button
          onClick={openAddItemModal}
          text={"Přidat nový seznam"}
          className="w-full text-2xl max-w-3xl py-3 rounded-lg bg-green-500 hover:bg-green-700 focus:ring-2 focus:ring-slate-500 transition-all duration-300"
        >
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        title={editingItem ? 'Upravit položku' : 'Přidat novou položku'}
        description="Zadejte název položky."
        inputPlaceholder="Název položky"
        inputValue={modalInput}
        onInputChange={(e) => setModalInput(e.target.value)}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddOrEditItem}
        showInput={true}
      />

      <Modal
        isOpen={isDeleteConfirmModalOpen}
        title="Opravdu chcete odstranit tuto položku?"
        description={`Položka: ${itemToDelete?.name}`}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        showInput={false}
      />
    </div>
  );
};

export default ShoppingListOverview;
