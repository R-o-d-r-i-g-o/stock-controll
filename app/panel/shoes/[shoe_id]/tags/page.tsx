import React from "react";
import Link from "next/link";

import * as svc from "@/lib/services";
import TagTable from "@/components/shared/table/tag";
import Container from "@/components/templates/container";

import { ArrowBack, Add } from "@mui/icons-material";

type TagListPageProps = {
  params: Promise<{
    shoe_id: number;
  }>;
};

const TagListPage = async ({ params }: TagListPageProps) => {
  const { shoe_id } = await params;
  const data = await svc.getShoeRelatedTags({ shoeId: shoe_id });

  return (
    <Container>
      <div className="flex justify-between">
        <Link href={`/panel/shoes/${data.meta.shoeId}`} className="flex items-center gap-2 text-gray-700 transition-colors hover:animate-jump animate-once">
          <ArrowBack fontSize="small" />
          Voltar
        </Link>
        <Link href={`/panel/shoes/${data.meta.shoeId}/tags/create`} className="text-gray-700 hover:animate-spin animate-once">
          <Add />
        </Link>
      </div>
      <TagTable meta={data.meta} data={data.tags} />
    </Container>
  );
};

export default TagListPage;
