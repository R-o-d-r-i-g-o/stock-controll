"use client";

import React from "react";
import useAccountUpdateForm from "./use-account-update";

type AccountUpgradeFromProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  shoeId: number;
};

const AccountUpgradeFrom: React.FC<AccountUpgradeFromProps> = ({ shoeId, className = "", ...rest }) => {
  const { handleDelete } = useAccountUpdateForm({ shoeId });

  return (
    <button {...rest} onClick={handleDelete} className={`w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ${className}`}>
      Atualizar plano
    </button>
  );
};

export default AccountUpgradeFrom;
