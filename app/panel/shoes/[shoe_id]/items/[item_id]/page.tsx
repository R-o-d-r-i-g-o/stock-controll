import * as svc from "@/lib/services";
import { notFound } from "next/navigation";

import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import ItemEditForm from "@/components/shared/form/item-edit";
import ItemDeleteForm from "@/components/shared/form/item-delete";

type UpdateShoePageProps = {
  params: Promise<{
    item_id: number;
  }>;
};

const UpdateShoePage = async ({ params }: UpdateShoePageProps) => {
  const itemId = (await params).item_id;
  const item = await svc.getItemById(itemId);

  if (!item) notFound();

  return (
    <Container display="small">
      <Title
        className="text-center text-3xl mb-6"
        text={`Editar item #${item.id}`}
      />
      <ItemEditForm item={item} />
      <ItemDeleteForm itemId={item.id} shoeId={item.shoeId} />
    </Container>
  );
};

export default UpdateShoePage;
