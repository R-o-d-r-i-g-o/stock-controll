import { getItemByIdAction } from "@/app/api/_backend/features/item/item.actions";
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
  const result = await getItemByIdAction(itemId);

  if (!result.success || !result.data) notFound();

  return (
    <Container display="small">
      <Title className="text-center text-3xl mb-6" text={`Editar item #${result.data.id}`} />
      <ItemEditForm item={result.data} />
      <ItemDeleteForm itemId={result.data.id} shoeId={result.data.shoeId} />
    </Container>
  );
};

export default UpdateShoePage;
