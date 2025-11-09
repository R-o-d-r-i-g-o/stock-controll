import React from "react";
import Link from "next/link";

import Title from "@/components/ui/title";
import Table from "@/components/shared/table/shoe";
import Container from "@/components/templates/container";

import { defaultPageSize } from "@/common/constants";

import { getShoesGroupedByItemSizePaginatedAction } from "@/lib/features/shoe/shoe.actions";

import CropFreeIcon from "@mui/icons-material/CropFree";
import AddIcon from "@mui/icons-material/Add";

type ShoesListPageProps = {
  searchParams: Promise<{
    page: string;
    size: string;
  }>;
};

const ActionButtons = () => (
  <div className="flex justify-end gap-4 mb-4">
    <Link href="/panel/shoes/scan" title="Escanear itens" className="flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
      <CropFreeIcon />
    </Link>
    <Link href="/panel/shoes/create" title="Adicionar Calçado" className="flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
      <AddIcon />
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
      <ActionButtons />
      <Title className="text-center mb-6" text="Calçados disponiveis" />
      <Table filter={filters} data={result.data} />
    </Container>
  );
};

export default ShoesListPage;
