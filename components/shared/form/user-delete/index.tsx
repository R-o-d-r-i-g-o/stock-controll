"use client";

import React from "react";
import useUserDeleteForm from "./use-user-delete";

type DeleteButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  userId: number;
};

const UserDeleteForm = ({ className, userId, ...rest }: DeleteButtonProps) => {
  const { handleUserDelete } = useUserDeleteForm({ userId });

  return (
    <button {...rest} type="button" onClick={handleUserDelete} className={`w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ${className}`}>
      Deletar Usuário
    </button>
  );
};

export default UserDeleteForm;
