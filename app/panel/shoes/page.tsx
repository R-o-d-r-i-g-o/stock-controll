import React from "react";
import Link from "next/link";

import Title from "@/components/ui/title";
import Table from "@/components/shared/table/shoe";
import Container from "@/components/templates/container";
import { defaultPageSize } from "@/common/constants";
import { getShoesGroupedByItemSizePaginatedAction } from "@/lib/features/shoe/shoe.actions";

import CropFreeIcon from "@mui/icons-material/CropFree";
import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from "@mui/icons-material/Inventory";

const ActionButtons = () => (
  <div className="flex flex-wrap gap-3">
    <Link
      href="/panel/shoes/scan"
      title="Escanear itens"
      className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2.5 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
    >
      <CropFreeIcon />
      <span className="font-medium">Escanear</span>
    </Link>
    <Link
      href="/panel/shoes/create"
      title="Adicionar Calçado"
      className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2.5 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
    >
      <AddIcon />
      <span className="font-medium">Novo Calçado</span>
    </Link>
  </div>
);

const ShoesListPage = async ({ searchParams }: ShoesListPageProps) => {
  const req = await searchParams;

  const filters = {
    page: parseInt(req.page ?? "1"),
    size: parseInt(req.size ?? defaultPageSize.toString()),
  };
  const result = await getShoesGroupedByItemSizePaginatedAction(filters);
  
  if (!result.success) {
    throw new Error(result.error);
  }

  return (
    <Container>
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100">
              <InventoryIcon className="text-indigo-600 text-3xl" />
            </div>
            <div>
              <Title className="!mb-0 !text-left" text="Calçados Disponíveis" />
              <p className="text-gray-600 text-sm mt-1">Gerencie seu estoque de calçados</p>
            </div>
          </div>
          <ActionButtons />
        </div>
      </div>
      <Table filter={filters} data={result.data as any} />
    </Container>
  );
};

type ShoesListPageProps = {
  searchParams: Promise<{
    page: string;
    size: string;
  }>;
};

export default ShoesListPage;
