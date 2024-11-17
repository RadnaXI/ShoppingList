import React from 'react';

const List = ({ items, onRemoveItem, onClick, onEditItem }) => {
  return (
    <ul className="space-y-2 w-full max-w-md">
      {items.map((item, index) => (
        <li
          key={index}
          className="py-2 px-4 rounded-lg bg-slate-400 hover:bg-slate-600 focus:ring-2 focus:ring-slate-500 transition-all duration-300 flex justify-between items-center"
          onClick={() => onClick(item)}
        >
          <span>{item}</span>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditItem(item);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded px-2 py-1"
            >
              Editovat
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveItem(item);
              }}
              className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1"
            >
              Odstranit
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default List;
