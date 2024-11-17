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
    localStorage.setItem(storageKey, JSON.stringify(updatedTasks));
  };

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim()) {
      let updatedTasks;
      if (editingTask !== null) {
        updatedTasks = tasks.map((task, index) =>
          index === editingTask ? { ...task, name: taskInput } : task
        );
        setEditingTask(null);
      } else {
        updatedTasks = [...tasks, { name: taskInput, completed: false }];
      }
      setTasks(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);
      setTaskInput('');
    }
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

  // Funkce pro obsluhu stisknutí klávesy Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask(); // Zavolá funkci pro přidání úkolu, když je stisknuto Enter
    }
  };

  return (
    <div className="h-screen bg-slate-50">
      <div className="flex flex-col items-start p-4 space-y-4">
        <h1 className="text-xl font-bold">Detail: {decodeURIComponent(id)}</h1>
        <TodoList
          tasks={tasks}
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          onRemoveTask={handleRemoveTask}
          onToggleComplete={handleToggleComplete}
          inputValue={taskInput}
          onInputChange={handleInputChange}
          editingTask={editingTask}
          onKeyPress={handleKeyPress} // Předání funkce pro obsluhu Enter
        />
      </div>
    </div>
  );
};

export default ShoppingListDetail;
