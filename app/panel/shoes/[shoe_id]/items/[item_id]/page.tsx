import EditIcon from "@mui/icons-material/Edit";

import { getItemByIdAction } from "@/lib/features/item/item.actions";
import { notFound } from "next/navigation";
import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import ItemEditForm from "@/components/shared/form/item-edit";
import ItemDeleteForm from "@/components/shared/form/item-delete";

type UpdateItemPageProps = {
  params: Promise<{
    item_id: string;
  }>;
};

const UpdateItemPage = async ({ params }: UpdateItemPageProps) => {
  const itemId = parseInt((await params).item_id, 10);
  const result = await getItemByIdAction(itemId);

  if (!result.success || !result.data) notFound();

  return (
    <Container display="small">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100">
            <EditIcon className="text-indigo-600 text-3xl" />
          </div>
          <div>
            <Title className="!mb-0 !text-left" text={`Editar Item #${result.data.id}`} />
            <p className="text-gray-600 text-sm mt-1">Atualize as informações do item</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100 mb-6">
        <ItemEditForm item={result.data} />
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100">
        <ItemDeleteForm itemId={result.data.id} shoeId={result.data.shoeId} />
      </div>
    </Container>
  );
};

export default UpdateItemPage;
