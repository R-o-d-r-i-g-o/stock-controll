import SellIcon from "@mui/icons-material/Sell";

import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import TagCreateForm from "@/components/shared/form/tag-create";

type TagCreatePageProps = {
  params: Promise<{ shoe_id: string }>;
};

const TagCreatePage = async ({ params }: TagCreatePageProps) => {
  const { shoe_id } = await params;
  const shoeId = parseInt(shoe_id);

  return (
    <Container display="small">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100">
            <SellIcon className="text-indigo-600 text-3xl" />
          </div>
          <div>
            <Title className="!mb-0 !text-left" text="Nova Etiqueta" />
            <p className="text-gray-600 text-sm mt-1">Crie uma etiqueta personalizada para o calçado</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100">
        <TagCreateForm shoeId={shoeId} />
      </div>
    </Container>
  );
};

export default TagCreatePage;
