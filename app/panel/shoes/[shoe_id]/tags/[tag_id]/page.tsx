import { notFound } from "next/navigation";

import Form from "./form";
import * as svc from "@/lib/services";

type UpdateUserPageProps = {
  params: Promise<{
    tag_id: number;
  }>;
};

const UpdateUserPage = async ({ params }: UpdateUserPageProps) => {
  const tagId = (await params).tag_id;
  const tag = await svc.getUserById(tagId);

  if (!tag) notFound();

  return <Form tag={{ id: 1, tagSku: "123", metadata: {} }} />;
};

export default UpdateUserPage;
