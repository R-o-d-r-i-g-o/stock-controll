import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import ShoeCreateForm from "@/components/shared/form/shoe-create";

const ShoeCreatePage = () => {
  return (
    <Container display="small">
      <Title className="text-center mb-6" text="Novo Calçado" />
      <ShoeCreateForm />
    </Container>
  );
};

export default ShoeCreatePage;
