import * as svc from "@/services";
import Form from "./form";

type UpdateShoePageProps = {
  params: Promise<{
    item_id: number;
  }>;
};

const UpdateShoePage = async ({ params }: UpdateShoePageProps) => {
  const itemId = (await params).item_id;
  const itemData = await svc.getShoeById(itemId);

  return <Form item={itemData} />;
};

export default UpdateShoePage;
