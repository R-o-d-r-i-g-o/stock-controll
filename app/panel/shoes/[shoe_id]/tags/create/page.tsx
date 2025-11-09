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
      <Title className="text-center text-3xl mb-6" text="Nova etiqueta" />
      <TagCreateForm shoeId={shoeId} />
    </Container>
  );
};

export default TagCreatePage;
