import React from "react";
import Link from "next/link";

import { getShoeRelatedTagsAction } from "@/lib/features/tag/tag.actions";
import TagTable from "@/components/shared/table/tag";
import Container from "@/components/templates/container";
import Title from "@/components/ui/title";

import { ArrowBack, Add, Sell } from "@mui/icons-material";

type TagListPageProps = {
  params: Promise<{
    shoe_id: string;
  }>;
};

const TagListPage = async ({ params }: TagListPageProps) => {
  const { shoe_id } = await params;
  const result = await getShoeRelatedTagsAction(parseInt(shoe_id, 10));
  
  if (!result.success) {
    throw new Error(result.error);
  }

  return (
    <Container>
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100">
              <Sell className="text-indigo-600 text-3xl" />
            </div>
            <div>
              <Title className="!mb-0 !text-left" text="Etiquetas do Calçado" />
              <p className="text-gray-600 text-sm mt-1">Gerencie as etiquetas personalizadas</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/panel/shoes/${result.data.meta.shoeId}`}
              className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300"
            >
              <ArrowBack fontSize="small" />
              <span className="font-medium">Voltar</span>
            </Link>
            <Link
              href={`/panel/shoes/${result.data.meta.shoeId}/tags/create`}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2.5 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Add />
              <span className="font-medium">Nova Etiqueta</span>
            </Link>
          </div>
        </div>
      </div>
      <TagTable meta={result.data.meta} data={result.data.tags as any} />
    </Container>
  );
};

export default TagListPage;
