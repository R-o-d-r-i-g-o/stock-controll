import React from "react";
import Link from "next/link";

import { getShoeRelatedTagsAction } from "@/app/api/_backend/features/tag/tag.actions";
import TagTable from "@/components/shared/table/tag";
import Container from "@/components/templates/container";

import { ArrowBack, Add } from "@mui/icons-material";

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
      <div className="flex justify-between">
        <Link href={`/panel/shoes/${result.data.meta.shoeId}`} className="flex items-center gap-2 text-gray-700 transition-colors hover:animate-jump animate-once">
          <ArrowBack fontSize="small" />
          Voltar
        </Link>
        <Link href={`/panel/shoes/${result.data.meta.shoeId}/tags/create`} className="text-gray-700 hover:animate-spin animate-once">
          <Add />
        </Link>
      </div>
      <TagTable meta={result.data.meta} data={result.data.tags} />
    </Container>
  );
};

export default TagListPage;
