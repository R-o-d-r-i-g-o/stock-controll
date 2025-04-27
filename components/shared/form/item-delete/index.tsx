"use client";

import React from "react";
import useItemDeleteForm from "./use-item-delete";

type ItemDeleteFormProps = {
  itemId: number;
  shoeId: number;
};

const ItemDeleteForm: React.FC<ItemDeleteFormProps> = ({ itemId, shoeId }) => {
  const { handleDelete } = useItemDeleteForm({ itemId, shoeId });

  return (
    <button type="button" onClick={handleDelete} className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300">
      Deletar item
    </button>
  );
};

export default ItemDeleteForm;
