'use client';

import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { Divider, IconButton } from '@mui/material';

import * as t from './_types'
import Table from './_table'

const ProductDash = ({ data }: t.DashProps) => {
  return (
    <React.Fragment>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {`Detalhes do Produto #${data.id}`}
        </h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">Nome</label>
              <input
                id="name"
                name="name"
                defaultValue={data.name}
                placeholder="Digite o nome do produto"
                className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="sole" className="block text-sm font-medium text-gray-600">Sola</label>
              <input
                id="sole"
                name="sole"
                defaultValue={data.sole}
                placeholder="Tipo de sola"
                className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-600">Cor</label>
              <input
                id="color"
                name="color"
                defaultValue={data.color}
                placeholder="Digite a cor do produto"
                className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-600">Nota</label>
              <input
                id="note"
                name="note"
                defaultValue={data.note}
                placeholder="Notas sobre o produto"
                className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>
          </div>
          <Divider sx={{ margin: '20px 0' }} />
          <div className="flex gap-2 items-center justify-center">
            <IconButton className=" !bg-green-500 !rounded-2xl !text-white">
              <AddIcon />
            </IconButton>
            <IconButton className=" !bg-blue-500 !rounded-2xl !text-white">
              <EditIcon />
            </IconButton>
            <IconButton className="!bg-red-500 !rounded-2xl !text-white">
              <DeleteIcon />
            </IconButton>
          </div>
        </form>
      </div>
      <Table data={data.shoes} />
    </React.Fragment>
  );
};

export default ProductDash;
