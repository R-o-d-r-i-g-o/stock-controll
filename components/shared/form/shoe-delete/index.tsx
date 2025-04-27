"use client";

import useShoeDeleteForm from "./use-shoe-delete";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

type ShoeDeleteFromProps = {
  shoeId: number;
};

const ShoeDeleteFrom: React.FC<ShoeDeleteFromProps> = ({ shoeId }) => {
  const { handleDelete } = useShoeDeleteForm({ shoeId });

  return (
    <IconButton onClick={handleDelete} className="!bg-red-500 !rounded-2xl !text-white" title="Deletar calçado">
      <DeleteIcon />
    </IconButton>
  );
};

export default ShoeDeleteFrom;
