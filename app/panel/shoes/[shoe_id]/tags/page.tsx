import React from "react";

import { defaultPageSize } from "@/common";
import { ZoomAnimateBlock } from "@/components/ui";

import Table from "./_table";
import { TableProps } from "./_types";

type TagListPageProps = {
  searchParams: Promise<{
    page: string;
    size: string;
  }>;
};

const mockData: TableProps = {
  meta: {
    page: 1,
    size: 10,
    shoeId: 1234,
  },
  data: [
    {
      id: 1,
      sku: "SKU001",
      user: 1,
      metadata: 101,
      createdAt: "2025-02-18T10:00:00Z",
      deletedAt: null,
    },
    {
      id: 2,
      sku: "SKU002",
      user: 2,
      metadata: 102,
      createdAt: "2025-02-17T15:30:00Z",
      deletedAt: null,
    },
    {
      id: 3,
      sku: "SKU003",
      user: 3,
      metadata: 103,
      createdAt: "2025-02-16T08:15:00Z",
      deletedAt: null,
    },
  ],
};

const TagListPage = async ({ searchParams }: TagListPageProps) => {
  const req = await searchParams;

  const filters = {
    page: parseInt(req.page ?? "1"),
    size: parseInt(req.size ?? defaultPageSize.toString()),
  };

  console.log("veio aqui filters", filters);

  return (
    <ZoomAnimateBlock className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-4xl mx-5 sm:mx-0">
      <Table meta={mockData.meta} data={mockData.data} />
    </ZoomAnimateBlock>
  );
};

export default TagListPage;
