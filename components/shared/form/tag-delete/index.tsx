"use client";

import React from "react";

import useTagDeleteForm from "./use-tag-delete";

type TagDeleteFromProps = {
  tagId: number;
};

const TagDeleteFrom: React.FC<TagDeleteFromProps> = ({ tagId }) => {
  const { handleDelete } = useTagDeleteForm({ tagId });

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
    >
      Deletar Usuário
    </button>
  );
};

export default TagDeleteFrom;
