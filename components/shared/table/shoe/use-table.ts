import { useState } from "react";

const useTable = () => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  return { handleRowClick, selectedRow };
};

export default useTable;
