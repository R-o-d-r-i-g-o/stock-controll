import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import TagCreateForm from "@/components/shared/form/tag-create";

const TagCreatePage = () => (
  <Container display="small">
    <Title className="text-center text-3xl mb-6" text="Nova etiqueta" />
    <TagCreateForm />;
  </Container>
);

export default TagCreatePage;
