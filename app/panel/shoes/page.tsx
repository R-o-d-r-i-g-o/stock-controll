import React from "react";
import Link from "next/link";

import Table from "./_table";
import { defaultPageSize, NavigationPage } from "@/common";

import * as svc from "@/lib/services";
import { ZoomAnimateBlock } from "@/components/ui";

import CropFreeIcon from "@mui/icons-material/CropFree";
import AddIcon from "@mui/icons-material/Add";

type UserListPageProps = {
  searchParams: Promise<{
    page: string;
    size: string;
  }>;
};

const ActionButtons = () => (
  <div className="flex justify-end gap-4 mb-4">
    <Link
      title="Baixa de itens"
      href={NavigationPage.ShoesSale}
      className="flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
    >
      <CropFreeIcon />
    </Link>
    <Link
      title="Adicionar Calçado"
      href={NavigationPage.ShoesCreate}
      className="flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
    >
      <AddIcon />
    </Link>
  </div>
);

const ShoesListPage = async ({ searchParams }: UserListPageProps) => {
  const req = await searchParams;

  const filters = {
    page: parseInt(req.page ?? "1"),
    size: parseInt(req.size ?? defaultPageSize.toString()),
  };
  const shoesPaginated = await svc.getShoesGroupedByItemSizePaginated(filters);

  return (
    <ZoomAnimateBlock className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-4xl mx-5 sm:mx-0">
      <ActionButtons />
      <Table filter={filters} data={shoesPaginated} />
    </ZoomAnimateBlock>
  );
};

export default ShoesListPage;
