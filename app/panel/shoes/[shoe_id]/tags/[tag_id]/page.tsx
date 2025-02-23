import { notFound } from "next/navigation";

import Form from "./form";
import * as svc from "@/lib/services";

type UpdateUserPageProps = {
  params: Promise<{
    tag_id: string;
    shoe_id: string;
  }>;
};

const UpdateUserPage = async ({ params }: UpdateUserPageProps) => {
  const req = await params;
  const filter = {
    tagId: parseInt(req.tag_id, 10),
    shoeId: parseInt(req.shoe_id, 10),
  };

  const tag = await svc.getShoeRelatedTag(filter);
  if (!tag) notFound();

  console.log("veio aqui no terorno da tag", tag);

  return <Form tag={tag} />;
};

export default UpdateUserPage;
