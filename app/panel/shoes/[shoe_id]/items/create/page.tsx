import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import ItemCreateForm from "@/components/shared/form/item-create";

type CreateItemPageProps = {
  params: Promise<{
    shoe_id: string;
  }>;
};

const CreateItemPage = async ({ params }: CreateItemPageProps) => {
  const shoeId = parseInt((await params).shoe_id, 10);

  return (
    <Container display="small">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100">
            <AddShoppingCartIcon className="text-indigo-600 text-3xl" />
          </div>
          <div>
            <Title className="!mb-0 !text-left" text="Novo Item" />
            <p className="text-gray-600 text-sm mt-1">Adicione um novo item ao estoque</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100">
        <ItemCreateForm shoeId={shoeId} />
      </div>
    </Container>
  );
};

export default CreateItemPage;
