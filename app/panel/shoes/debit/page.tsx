"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Scanner from "./_scanner";

import * as svc from "@/services";

const RegisterBuying = () => {
  const { failure, success } = useToast();
  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState<string>("");

  const sendSKUs = async () => {
    try {
      await svc.debitShoesFromStorage(tasks);
      success("SKUs enviados com sucesso!");
      setTasks([]);
    } catch (error) {
      console.error(error);
      failure("Não foi possível concluir a requisição.");
    }
  };

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
  };

  const handleScanResult = (scannedTask: string) => {
    if (!tasks || tasks.includes(scannedTask)) return;
    setTask(scannedTask);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full max-w-sm">
      <h2 className="text-xl font-medium text-center text-gray-800 mb-4">
        SKUs para baixa
      </h2>
      <Scanner onResult={handleScanResult} className="rounded-md mb-6" />
      <div className="flex items-center border-b border-gray-300 pb-2 mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Digite o SKU"
          className="flex-grow p-2 text-sm focus:outline-none"
        />
        <IconButton onClick={addTask} color="primary">
          <AddIcon fontSize="small" />
        </IconButton>
      </div>
      <ul className="divide-y divide-gray-200">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-2 text-sm"
          >
            <span className="text-gray-700">{task}</span>
            <IconButton onClick={() => removeTask(index)} color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </li>
        ))}
      </ul>
      {tasks.length > 0 && (
        <button
          onClick={sendSKUs}
          className="mt-4 w-full py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
        >
          Enviar SKUs
        </button>
      )}
    </div>
  );
};

export default RegisterBuying;
