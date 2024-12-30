import * as svc from "@/services";
import Form from "./form";
import { notFound } from "next/navigation";

type UpdateShoePageProps = {
  params: Promise<{
    item_id: number;
  }>;
};

const UpdateShoePage = async ({ params }: UpdateShoePageProps) => {
  const itemId = (await params).item_id;
  const itemData = await svc.getItemById(itemId);

  if (!itemData) notFound();

  return <Form item={itemData} />;
};

export default UpdateShoePage;
