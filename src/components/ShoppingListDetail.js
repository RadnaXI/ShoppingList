import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TodoList from '../templates/ToDoList';

const ShoppingListDetail = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const storageKey = `tasks_${id}`;

  useEffect(() => {
    const savedTasks = localStorage.getItem(storageKey);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, [storageKey]);

  const saveTasksToLocalStorage = (updatedTasks) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  };

  const handleInputChange = (e) => setTaskInput(e.target.value);

  const handleAddTask = () => {
    if (!taskInput.trim()) return;

    const updatedTasks = editingTask
      ? tasks.map((task, index) =>
          index === editingTask ? { ...task, name: taskInput } : task
        )
      : [...tasks, { name: taskInput, completed: false }];
      
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setTaskInput('');
    setEditingTask(null);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, idx) =>
      idx === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleEditTask = (index) => {
    setTaskInput(tasks[index].name);
    setEditingTask(index);
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="h-screen bg-slate-50">
      <div className="flex flex-col items-start p-4 space-y-4">
        <h1 className="text-xl font-bold">Detail seznamu: {decodeURIComponent(id)}</h1>
        <TodoList
          tasks={tasks}
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          onRemoveTask={handleRemoveTask}
          onToggleComplete={handleToggleComplete}
          inputValue={taskInput}
          onInputChange={handleInputChange}
          editingTask={editingTask}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default ShoppingListDetail;
