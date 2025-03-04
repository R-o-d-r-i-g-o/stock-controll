import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import ItemCreateForm from "@/components/shared/form/item-create";

type UpdateUserPageProps = {
  params: Promise<{
    shoe_id: string;
  }>;
};

const CreateShoePage = async ({ params }: UpdateUserPageProps) => {
  const shoeId = parseInt((await params).shoe_id, 10);

  return (
    <Container display="small">
      <Title className="text-center text-3xl mb-6" text="Novo item" />
      <ItemCreateForm shoeId={shoeId} />;
    </Container>
  );
};

export default CreateShoePage;
