import React from 'react';

const TodoList = ({
  tasks,
  onAddTask,
  onEditTask,
  onRemoveTask,
  onToggleComplete,
  inputValue,
  onInputChange,
  editingTask,
  onKeyPress
}) => {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex space-x-4">
        <input
          type="text"
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onKeyPress} // Obsluha Enter
          placeholder="Zadejte nový úkol"
          className="flex-grow py-2 px-4 rounded-lg bg-blue-100 hover:bg-blue-200 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
        />
        <button
          onClick={onAddTask}
          className="py-2 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-all duration-300"
        >
          {editingTask !== null ? 'Uložit změny' : 'Přidat úkol'}
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-blue-100 hover:bg-blue-200 p-4 rounded-lg transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(index)}
                className="w-5 h-5"
              />
              <span
                className={`text-lg ${
                  task.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {task.name}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEditTask(index)}
                className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
              >
                Upravit
              </button>
              <button
                onClick={() => onRemoveTask(index)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Odstranit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
