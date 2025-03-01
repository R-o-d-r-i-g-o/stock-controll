import React from "react";

import Table from "./_table";
import Container from "@/components/templates/container";

import * as svc from "@/lib/services";

type TagListPageProps = {
  params: Promise<{
    shoe_id: number;
  }>;
};

const TagListPage = async ({ params }: TagListPageProps) => {
  const { shoe_id } = await params;
  const data = await svc.getShoeRelatedTags({ shoeId: shoe_id });

  return (
    <Container className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-4xl mx-5 sm:mx-0">
      <Table meta={data.meta} data={data.tags} />
    </Container>
  );
};

export default TagListPage;
