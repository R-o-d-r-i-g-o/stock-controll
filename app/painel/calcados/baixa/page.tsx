"use client"

import React, { useState } from 'react';

import { IconButton } from '@mui/material';
import Scanner from './_scanner'

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const RegisterBuying = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState<string>('');

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const removeTask = (index: number) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        SKUs p/a baixa do estoque
      </h2>
      <Scanner />

      <div className="flex items-center mb-6">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Adicione uma nova tarefa"
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="ml-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <AddIcon />
        </button>
      </div>
      <ul className="space-y-4">
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md">
            <span className="text-gray-700">{task}</span>
            <IconButton
              onClick={() => removeTask(index)}
              className="hover:text-red-600 transition"
            >
              <DeleteIcon />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RegisterBuying;
